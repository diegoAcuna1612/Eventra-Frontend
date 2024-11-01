import { Component, Input } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {Event} from '../../model/event';

@Component({
  selector: 'app-card-event',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
  @Input() event!: Event;

  constructor(private router: Router) {}

  navigateToEventDetails() {
    console.log('Navigating to event details:', this.event.title);
    this.router.navigate(['/info-event']);
  }

  navigateToEventInfo() {
    this.router.navigate(['/info-event']);
  }

  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() tags!: string[];
  @Input() price!: number;
  @Input() theme: 'orange' | 'blue' = 'orange';
  @Input() fecha!: string; // Agregar este @Input para aceptar la fecha
}
