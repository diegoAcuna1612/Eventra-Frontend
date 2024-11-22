import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';  // Importa UsersService
import { User } from '../../model/user';  // Importa el modelo User
import { HttpClient } from '@angular/common/http';  // Importa HttpClient
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private usersService: UsersService, private http: HttpClient) {}

  onSubmit() {
    const loginData: Partial<User> = {
      email: this.email,
      password: this.password
    };

    this.usersService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('userId', response.id); 
        localStorage.setItem('role', response.role);
        localStorage.setItem('name',response.username);
        localStorage.setItem('email',response.email);
        const role = response.role;
        const apiUrl = role === 'BUSINESS' 
          ? this.usersService.getApiURLBusiness() 
          : this.usersService.getApiUrlClient();

        if (apiUrl) {
          const entityUrl = `${apiUrl}/${response.id}`;
          this.http.get(entityUrl).subscribe((entityResponse: any) => {
            const direccion = entityResponse?.user?.publicDirection;
            if (direccion) {
              localStorage.setItem('direccion', direccion); // Guardar en localStorage
              console.log('Public Direction:', direccion);
            } else {
              console.error('Public Direction not found in entityResponse');
            }
          });
}
        
     
        this.usersService.loginn();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Error al iniciar sesión');
      }
    });
  }
}
