import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
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
    this.loadClientData();
  }

  loadClientData(): void {
    const clientId = localStorage.getItem('userId')
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
      this.http.put(`${environment.domain}clients`, this.updateProfileForm.value).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
