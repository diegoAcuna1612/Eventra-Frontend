import {Component, OnInit} from '@angular/core';
import {Event} from '../../model/event';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FilterEventComponent} from '../../components/filter-event/filter-event.component';

@Component({
  selector: 'app-search-event',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgForOf,
    CardEventComponent,
    FilterEventComponent
  ],
  templateUrl: './search-event.component.html',
  styleUrl: './search-event.component.css'
})
export class SearchEventComponent implements OnInit {
  searchQuery: string = '';
  filters = {
    category: '',
    minPrice: null,
    maxPrice: null,
    startDate: '',
    endDate: ''
  };
  events: Event[] = [
    {
      id:'1',
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/903365effa8c75f6365b38f2656a8860ddda2a7b54fd897366503d28f5ac171e?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Voley ProLeague - Week #1',
      description: 'La mejor liga de voley del mundo',
      fecha: '14 de noviembre 2024',
      tags: ['Deporte', 'Entretenimiento', 'Estadio'],
      price: 20.00,
      location: 'Estadio Nacional',
      rating: 4.5,
      hour: '8:00 PM'
    }
  ];

  filteredEvents: Event[] = this.events;
  paginatedEvents: Event[] = [];
  currentPage = 0;
  itemsPerPage = 3;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.onSearch();
    });
  }

  onSearch() {
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.updatePaginatedEvents();
  }

  applyFilters(filters: any) {
    this.filters = filters;
    this.filteredEvents = this.events.filter(event => {
      return (
        (!this.filters.category || event.tags.includes(this.filters.category)) &&
        (!this.filters.minPrice || event.price >= this.filters.minPrice) &&
        (!this.filters.maxPrice || event.price <= this.filters.maxPrice) &&
        (!this.filters.startDate || new Date(event.fecha) >= new Date(this.filters.startDate)) &&
        (!this.filters.endDate || new Date(event.fecha) <= new Date(this.filters.endDate))
      );
    });
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.filteredEvents.length) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

}
