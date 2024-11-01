import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';  // Importa UsersService
import { User } from '../../model/user';  // Importa el modelo User

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private usersService: UsersService) {}

  onSubmit() {
    const loginData: Partial<User> = {
      email: this.email,
      password: this.password
    };

    this.usersService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Error al iniciar sesión');
      }
    });
  }
}
