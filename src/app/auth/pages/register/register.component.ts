import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../model/user';

function initializeUser(data: Partial<User> = {}): User {
  if (!data.username) {
    throw new Error("El campo 'username' es obligatorio.");
  }
  if (!data.email) {
    throw new Error("El campo 'email' es obligatorio.");
  }
  if (!data.password) {
    throw new Error("El campo 'password' es obligatorio.");
  }
  if(!data.publicDirection) {
    throw new Error("El campo 'publicDirection' es obligatorio.");
  }	
  if (!data.role) {
    throw new Error("El campo 'role' es obligatorio.");
  }

  return {
    id: '',
    username: data.username,
    email: data.email,
    password: data.password,
    photo: data.photo || 'default-photo-url',
    role: data.role,
    status: data.status || 'ACTIVE',
    publicDirection: data.publicDirection
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      publicDirection: ['', Validators.required]  
    }, {
      validator: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Asegúrate de leer el valor correcto de 'role' del formulario
      const selectedRole = this.registerForm.get('role')?.value;
      const role = selectedRole === 'Organizador' ? 'BUSINESS' : 'CLIENT';
  
      const userData = initializeUser({
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: role,
        publicDirection: this.registerForm.get('publicDirection')?.value 
      });
  
      this.usersService.createUser(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/verify-email']);
        },
        error: (error) => {
          console.error('Registration error:', error.message);
        }
      });
    } else {
      console.error('Form is invalid', this.registerForm.errors);
    }
  }
  
}
