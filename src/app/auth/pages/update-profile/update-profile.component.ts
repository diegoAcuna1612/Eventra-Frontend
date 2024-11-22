import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf,NgIf} from '@angular/common';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  usernamePlaceholder: string = 'Username';
  directionPlaceholder: string = 'Direction';
  emailPlaceholder: string = 'Email';
  usernameRole: string | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService
  ) {
    this.updateProfileForm = this.fb.group({
      realName: ['', Validators.required],
      birthDate: ['', Validators.required],
      dni: ['', Validators.required],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      direction: ['', Validators.required],
      phone: ['', Validators.required],
      clientId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.usernameRole = localStorage.getItem('role'); // O la lógica para obtener el rol
    this.loadClientData();

  }


  loadClientData(): void {
    this.usernamePlaceholder = localStorage.getItem('name') ?? 'Default Username';
    this.directionPlaceholder = localStorage.getItem('direccion')?? 'Default Direction';
    this.emailPlaceholder = localStorage.getItem('email')?? 'Default Email';
    const clientId = localStorage.getItem('userId');
    

    this.http.get(`${environment.domain}clients/${clientId}`).subscribe((data: any) => {
      this.updateProfileForm.patchValue({
        username: data.username,
        email: data.email,
        realName: data.realname,
        birthDate: data.birthdate,
        dni: data.dni,
        country: data.country,
        gender: data.gender,
        direction: data.Direction,
        phone: data.phone,
        clientId: data.id
      });
    });
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      // Construir el objeto en el formato requerido por el backend
      const clientData = {
        realName: this.updateProfileForm.get('realName')?.value,
        birthDate: this.updateProfileForm.get('birthDate')?.value,
        dni: this.updateProfileForm.get('dni')?.value,
        country: this.updateProfileForm.get('country')?.value,
        gender: this.updateProfileForm.get('gender')?.value,
        direction: this.updateProfileForm.get('direction')?.value,
        phone: this.updateProfileForm.get('phone')?.value,
        clientId: localStorage.getItem('userId'),
      };
  
      console.log('Request body to be sent:', clientData);

      // Usar el servicio para actualizar el cliente
      
      this.usersService.updateClient(clientData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Error al actualizar el perfil. Por favor, intenta nuevamente.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
  
}
