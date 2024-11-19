import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  events: any[] = [];
  //constructor(private eventService: EventService) {}

  event: any;

  ngOnInit(): void {
    this.event = {
      imageUrl: 'https://example.com/event-image.jpg',
      name: 'Evento de Ejemplo',
      attendees: 150,
      purchaseRate: '75%',
      male: 80,
      female: 70,
      averageAge: 30,
      socialLikes: {
        facebook: 120,
        twitter: 80,
        instagram: 200
      },
      comparison: [
        {
          name: 'Evento Comparado 1',
          attendees: 100,
          purchaseRate: '60%',
          male: 50,
          female: 50,
          averageAge: 28,
          interactions: 300
        },
        {
          name: 'Evento Comparado 2',
          attendees: 200,
          purchaseRate: '80%',
          male: 120,
          female: 80,
          averageAge: 32,
          interactions: 500
        }
      ]
    };
  }
}

