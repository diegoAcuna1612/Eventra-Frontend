import {Component,OnInit} from '@angular/core';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {Event} from '../../model/event';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client';
import { UsersService } from '../../../auth/services/users.service';
import { EventCard } from '../../model/event-card';
import { ActivitiesService } from '../../services/event-card.service';
import { Router } from '@angular/router';
import { InteractionPages } from '../../services/interaction-pages';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardEventComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  eventsTrending: EventCard[] = [];
  eventsFeatured: EventCard[] = [];
  eventsDiscover: EventCard[] = [];

  currentPageTendencias = 0;
  currentPageDescubre = 0;
  currentPageDestacados = 0;
  itemsPerPage = 4;
  totalPagesDestacados: number = Math.ceil(this.eventsFeatured.length / this.itemsPerPage);
  totalPagesTendencias: number = Math.ceil(this.eventsTrending.length / this.itemsPerPage);
  totalPagesDescubre: number = Math.ceil(this.eventsDiscover.length / this.itemsPerPage);

  constructor(private activitiesService: ActivitiesService,private interactionPages:InteractionPages, private router:Router) {}


  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activitiesService.getActivitiesByType('TRENDING').subscribe((events) => {
      this.eventsTrending = events;
      this.totalPagesTendencias = Math.ceil(events.length / this.itemsPerPage);
    });
    
    this.activitiesService.getActivitiesByType('FEATURED').subscribe((events) => {
      this.eventsFeatured = events;
      this.totalPagesDestacados = Math.ceil(events.length / this.itemsPerPage);
    });
    
    this.activitiesService.getActivitiesByType('DISCOVER').subscribe((events) => {
      this.eventsDiscover = events;
      this.totalPagesDescubre = Math.ceil(events.length / this.itemsPerPage);
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const dayName = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${dayName}: ${day}/${month}/${year} ${hours}:${minutes}`;
  }
  get paginatedEventsTendencias(): EventCard[] {
    const start = this.currentPageTendencias * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.eventsTrending.slice(start, end);
  }

  get paginatedEventsDescubre(): EventCard[] {
    const start = this.currentPageDescubre * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.eventsDiscover.slice(start, end);
  }

  get paginatedEventsDestacados(): EventCard[] {
    const start = this.currentPageDestacados * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.eventsFeatured.slice(start, end);
  }

  previousPageTendencias() {
    if (this.currentPageTendencias > 0) this.currentPageTendencias--;
  }

  nextPageTendencias() {
    if (this.currentPageTendencias < Math.ceil(this.eventsTrending.length / this.itemsPerPage) - 1)
      this.currentPageTendencias++;
  }

  previousPageDescubre() {
    if (this.currentPageDescubre > 0) this.currentPageDescubre--;
  }

  nextPageDescubre() {
    if (this.currentPageDescubre < Math.ceil(this.eventsDiscover.length / this.itemsPerPage) - 1)
      this.currentPageDescubre++;
  }

  previousPageDestacados() {
    if (this.currentPageDestacados > 0) this.currentPageDestacados--;
  }

  nextPageDestacados() {
    if (this.currentPageDestacados < Math.ceil(this.eventsFeatured.length / this.itemsPerPage) - 1)
      this.currentPageDestacados++;
  }
   // Método para navegar a InfoEventComponent
   onEventClicked(eventId: string) {
    console.log('onEventClicked');
    console.log('ID del evento:', eventId);
    this.interactionPages.setEventId(eventId); // Almacena el `eventId` en el servicio
  }

  navigateToCreateEvent() {
    this.router.navigate(['/create-event']);
  }
}
