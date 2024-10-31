import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../shared/services/notification.service';
import {NgForOf} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      imageSrc: ['https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg', Validators.required],
      eventName: ['', Validators.required],
      category: [[], Validators.required],
      categoryInput: [''],
      dates: this.fb.array([this.createDateGroup()]),
      location: ['', Validators.required],
      description: ['', Validators.required],
      tickets: this.fb.array([this.createTicketGroup()])
    });
  }

  createTicketGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  get tickets(): FormArray {
    return this.eventForm.get('tickets') as FormArray;
  }

  addTicket(): void {
    this.tickets.push(this.createTicketGroup());
  }

  removeTicket(index: number): void {
    this.tickets.removeAt(index);
  }

  addCategory(event: any): void {
    event.preventDefault();
    const categoryInput = this.eventForm.get('categoryInput')?.value.trim();
    const categories = this.eventForm.get('category')?.value;

    if (categoryInput && categories.length < 4 && !categories.includes(categoryInput)) {
      categories.push(categoryInput);
      this.eventForm.get('category')?.setValue(categories);
      this.eventForm.get('categoryInput')?.reset();
    }
  }

  removeCategory(category: string): void {
    const categories = this.eventForm.get('category')?.value.filter((c: string) => c !== category);
    this.eventForm.get('category')?.setValue(categories);
  }


  get dates(): FormArray {
    return this.eventForm.get('dates') as FormArray;
  }

  createDateGroup(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  addDate(): void {
    this.dates.push(this.createDateGroup());
  }

  removeDate(index: number): void {
    this.dates.removeAt(index);
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
