import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Activity} from '../../model/activity';
import {NgForOf} from '@angular/common';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-detail-event',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './card-detail-event.component.html',
  styleUrl: './card-detail-event.component.css'
})
export class CardDetailEventComponent implements OnInit{
  @Input() eventId: string = ''; // Recibe el `eventId` como input

  event?: Activity;

  constructor(private route: ActivatedRoute,private eventService: EventService
  ) {}
  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id'); // Obtiene `eventId` de la URL
    if (eventId) {
      this.eventService.getActivityById(eventId).subscribe(
        (eventData) => {
          this.event = eventData;
        },
        (error) => {
          console.error('Error al cargar los datos del evento:', error);
        }
      );
    }
  }
  

}
