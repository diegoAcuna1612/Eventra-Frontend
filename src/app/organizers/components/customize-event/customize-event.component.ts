import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-customize-event',
  standalone: true,
  imports: [InputTextModule,FloatLabelModule,FormsModule,CalendarModule,InputTextareaModule,ButtonModule,IconFieldModule,],
  templateUrl: './customize-event.component.html',
  styleUrl: './customize-event.component.css'
})
export class CustomizeEventComponent {
  eventName: string = ''; 
  selectedEvent: string = '';
  selectedDate: Date | null = null; // Variable para almacenar la fecha seleccionada
  time: string = ''; // Variable para almacenar la hora seleccionada
  eventPlace: string = ''; // Variable para almacenar el lugar del evento
  eventDescription  : string = ''; // Variable para almacenar la descripción del evento
}
