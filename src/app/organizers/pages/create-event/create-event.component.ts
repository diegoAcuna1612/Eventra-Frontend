import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../shared/services/notification.service';
import {NgForOf} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { HttpClient } from '@angular/common/http';

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
  private apiKey: string = '81a5476ca6d8a43a5f3fd455d2b9ad4a'; // Reemplaza con tu API key de imgBB
  imageUrl: string | null = null;
  colors = [
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Platino', hex: '#C5C5C5' },
    { name: 'Amarillo', hex: '#F8AA0D' }
  ];
  constructor(private http:HttpClient,private fb: FormBuilder, private notificationService: NotificationService, private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      photo: ['https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg', Validators.required],
      name: ['', Validators.required],
      tags: [[], Validators.required],
      tagsInput: [''],
      fechas_eventos: this.fb.array([this.createDateGroup()]),
      location: ['', Validators.required],
      description: ['', Validators.required],
      tickets: this.fb.array([this.createTicketGroup()])
    });

      // Escucha cambios en el formulario y los imprime en consola
    this.eventForm.valueChanges.subscribe(value => {
      console.log('Formulario actualizado:', value);
    });
     // Escucha cambios en el campo fechas_eventos y convierte a ISO 8601
    this.fechas_eventos.valueChanges.subscribe((fechas: any) => {
      fechas.forEach((fechaEvento: { date: string, time: string }, index: number) => {
        if (fechaEvento.date && fechaEvento.time) {
          const date = new Date(`${fechaEvento.date}T${fechaEvento.time}`);
          console.log(`Fecha y hora en formato ISO 8601 (evento ${index + 1}):`, date.toISOString());
        }
      });
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

  addTags(event: any): void {
    event.preventDefault();
    const tagsInput = this.eventForm.get('tagsInput')?.value.trim();
    const categories = this.eventForm.get('tags')?.value;

    if (tagsInput && categories.length < 4 && !categories.includes(tagsInput)) {
      categories.push(tagsInput);
      this.eventForm.get('tags')?.setValue(categories);
      this.eventForm.get('tagsInput')?.reset();
    }
  }

  removeTags(tags: string): void {
    const categories = this.eventForm.get('tags')?.value.filter((c: string) => c !== tags);
    this.eventForm.get('tags')?.setValue(categories);
  }


  get fechas_eventos(): FormArray {
    return this.eventForm.get('fechas_eventos') as FormArray;
  }

  createDateGroup(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  addDate(): void {
    this.fechas_eventos.push(this.createDateGroup());
  }

  removeDate(index: number): void {
    this.fechas_eventos.removeAt(index);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(base64Image => {
        this.uploadImageToImgBB(base64Image).then((imgBBUrl: string) => {
          this.eventForm.patchValue({ photo: imgBBUrl }); // Actualiza con la URL de imgBB
        });
      });
    }
  }
  
  // Método para convertir el archivo a base64
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]); // Obtener solo el base64
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
  // Método para subir la imagen a imgBB
  uploadImageToImgBB(base64Image: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', base64Image);
  
    return this.http.post(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, formData)
      .toPromise()
      .then((response: any) => response.data.url as string) // Devuelve la URL de la imagen subida
      .catch((error) => {
        console.error('Error en la subida a imgBB:', error);
        throw error;
      });
  }
  
  
onSubmit(): void {
  if (this.eventForm.invalid) {
    this.notificationService.showNotification('Por favor, completa todos los campos requeridos.');
    return;
  }

  // Obtener el userId desde localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
    this.notificationService.showNotification('No se encontró el usuario. Inicia sesión nuevamente.');
    return;
  }

  // Mapeo para que fechas_eventos sea un array de strings en formato ISO 8601
  const fechasEventos = this.eventForm.value.fechas_eventos.map((fechaEvento: { date: string, time: string }) => {
    const date = new Date(`${fechaEvento.date}T${fechaEvento.time}`);
    return date.toISOString();
  });

  // Subir la imagen a imgBB antes de enviar los datos al backend
  const base64Photo = (this.eventForm.value.photo as string).replace(/^data:image\/[a-z]+;base64,/, '');
  this.uploadImageToImgBB(base64Photo).then((imgBBUrl: string) => {  
    const formValue = {
      ...this.eventForm.value,
      photo: imgBBUrl, // Usa la URL de imgBB en lugar de base64
      fechas_eventos: fechasEventos,
      businessId: Number(userId)
    };

    console.log('Datos del formulario a enviar:', formValue);

    // Llamada al servicio para enviar los datos al backend
    this.activitiesService.createActivity(formValue).subscribe({
      next: (response) => {
        console.log('Evento creado con éxito:', response);
        this.notificationService.showNotification('Evento guardado y publicado con éxito.');
      },
      error: (error) => {
        console.error('Error al crear el evento:', error);
        this.notificationService.showNotification('Hubo un error al guardar el evento. Inténtalo nuevamente.');
      }
    });
  }).catch((error) => {
    console.error('Error al subir la imagen a imgBB:', error);
    this.notificationService.showNotification('Hubo un error al subir la imagen. Inténtalo nuevamente.');
  });
}


  
  
  
}
