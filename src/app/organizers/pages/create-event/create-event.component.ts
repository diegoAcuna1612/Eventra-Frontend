import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/services/notification.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      imageSrc: ['https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg', Validators.required],
      eventName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        this.notificationService.showNotification('Formato de imagen no permitido. Solo se permiten JPEG y PNG.');
        return;
      }

      if (file.size > maxSize) {
        this.notificationService.showNotification('El tamaño de la imagen no debe exceder los 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.eventForm.patchValue({
          imageSrc: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.notificationService.showNotification('Por favor, completa todos los campos requeridos.');
      return;
    }

    // falta la logica

    console.log('Formulario enviado', this.eventForm.value);
    this.notificationService.showNotification('Evento guardado y publicado con éxito.');
  }
}
