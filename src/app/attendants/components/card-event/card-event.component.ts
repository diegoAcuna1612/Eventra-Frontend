import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {Event} from '../../model/event';
import { InteractionPages } from '../../services/interaction-pages';
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
  eventId: string | null = null; // Variable para almacenar el `eventId`

  constructor(private router: Router, private interactionPages:InteractionPages) {}
  ngOnInit() {
    // Suscríbete al observable para obtener el `eventId`
    this.interactionPages.currentEventId$.subscribe((id) => {
      this.eventId = id;
    });
  }
  navigateToEventDetails() {
    if (this.eventId) {
      this.router.navigate(['/info-event', this.eventId]); // Navega usando `eventId`
    } else {
      console.error('No eventId available');
    }
  }
  
  navigateToEventInfo() {
    if (this.eventId) {
      this.router.navigate(['/info-event', this.eventId]); // Navega usando `eventId`
    } else {
      console.error('No eventId available');
    }
  }

  @Input() id: string = ''; // Asegúrate de tener el id como input
  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() tags!: string[];
  @Input() price!: number;
  @Input() theme: 'orange' | 'blue' = 'orange';
  @Input() fecha!: string; 

  @Output() eventClicked = new EventEmitter<string>();
  onCardClick() {
    this.eventClicked.emit(this.id);
  }

}
