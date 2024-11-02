import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Activity} from '../../model/activity';
import {NgForOf} from '@angular/common';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-card-detail-event',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './card-detail-event.component.html',
  styleUrl: './card-detail-event.component.css'
})
export class CardDetailEventComponent implements OnInit{
  event!: Activity;
  eventTitle: string = ''; 

  constructor(private route: ActivatedRoute,private eventService: EventService
  ) {}

  ngOnInit() {
    const eventId = '4';

    this.eventService.getActivityById(eventId).subscribe(
      (eventData) => {
        this.event = eventData; // Asigna directamente el objeto completo a `this.event`
      },
      (error) => {
        console.error('Error al cargar los datos del evento:', error);
      }
    );
  }

}
