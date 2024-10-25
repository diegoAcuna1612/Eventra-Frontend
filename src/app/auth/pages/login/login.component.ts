import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';  // Asegúrate de tener el servicio UsersService importado

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

  constructor(private router: Router, private usersService: UsersService) { }

  onSubmit() {
    // Crear el objeto de datos de login
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Llamar al servicio de login
    this.usersService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Redirigir al home después del login exitoso
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        // Mostrar un mensaje de error o manejarlo como sea necesario
        alert('Error al iniciar sesión');
      }
    });
  }
}
