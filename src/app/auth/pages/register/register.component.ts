import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';  // Importa ReactiveFormsModule

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
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator 
    });
  }

  // Validación personalizada para contraseñas coincidentes
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegister() {
    console.log('Register form submitted'); // Agregar este log para verificar
    if (this.registerForm.valid) {
      const userData = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: 'asasdasdasdd',
        email: this.registerForm.get('email')?.value,
        image: 'asdasdasd', 
        birthday: 'asdasdasd', 
        dni: 'asdasdasd',   
        country: 'asasdasdasdd',  
        gender: 'asdasdasd',    
        address: 'asdasdasdasd',  
        phone: '123456789'    
      };
      console.log('User Data:', userData); // Verificar los datos que se están enviando

      this.usersService.createUser(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/verify-email']); 
        },
        error: (error) => {
          console.error('Registration error:', error.message);
          console.error('Full error response:', error);
        }
        
      });
    } else {
      console.error('Form is invalid', this.registerForm.errors);
    }
  }
  
  
}
