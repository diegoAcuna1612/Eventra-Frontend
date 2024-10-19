import {Component} from '@angular/core';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {Event} from '../../model/event';
import {NgForOf, NgOptimizedImage} from '@angular/common';

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
export class MainComponent {
  events: Event[] = [
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/903365effa8c75f6365b38f2656a8860ddda2a7b54fd897366503d28f5ac171e?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Voley ProLeague - Week #1',
      description: 'La mejor liga de voley del mundo',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Deporte', 'Entretenimiento', 'Estadio'],
      price: 20.00,
      location: 'Estadio Nacional',
      rating: 4.5,
      hour: '8:00 PM'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fe8f7093a7a8ea317127f9ca14f30bfe3af150e90a374517b1f50501b9802292?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Gran Festival de la Cumbia',
      description: 'Los mejores artistas de cumbia en un solo lugar',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Musica', 'Cumbia', 'Salsa', 'Varios', 'Baile'],
      price: 10.00,
      location: 'Estadio Nacional',
      rating: 4.5,
      hour: '8:00 PM'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d8911172a27426a6344fd019f4ecc522b7f1fd6dd791bc446fb6c7e8fc53997d?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Un dia como hoy',
      description: 'Obra de teatro de comedia',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Teatro', 'Entretenimiento', 'Gratis', 'Actores'],
      price: 0.00,
      location: 'Teatro Municipal',
      rating: 4.5,
      hour: '8:00 PM'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c2adb1d8e01ed94397b13d4c1302e949c6008420a246462a35fd8eb18d72d7ff?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Daniela Darcourt - Lima',
      description: 'Concierto de salsa',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Musica', 'Entretenimiento', 'Salsa', 'Concierto'],
      price: 50.00,
      location: 'Estadio Nacional',
      rating: 4.5,
      hour: '8:00 PM'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Concierto de Rock',
      description: 'Concierto de rock en vivo',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Musica', 'Rock', 'Concierto'],
      price: 30.00,
      location: 'Estadio Nacional',
      rating: 4.5,
      hour: '8:00 PM'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
      title: 'Feria de Gastronomía',
      description: 'Feria de comida peruana',
      startEventDate: '14 de noviembre 2024',
      endEventDate: '15 de noviembre 2024',
      tags: ['Gastronomia', 'Feria', 'Comida'],
      price: 15.00,
      location: 'Estadio Nacional',
      rating: 5,
      hour: '8:00 PM'
    }
  ];

  currentPageTendencias = 0;
  currentPageDescubre = 0;
  currentPageDestacados = 0;
  itemsPerPage = 4;
  totalPagesTendencias = Math.ceil(this.events.length / this.itemsPerPage);
  totalPagesDescubre = Math.ceil(this.events.length / this.itemsPerPage);
  totalPagesDestacados = Math.ceil(this.events.length / this.itemsPerPage);

  get paginatedEventsTendencias(): Event[] {
    const start = this.currentPageTendencias * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.events.slice(start, end);
  }

  get paginatedEventsDescubre(): Event[] {
    const start = this.currentPageDescubre * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.events.slice(start, end);
  }

  get paginatedEventsDestacados(): Event[] {
    const start = this.currentPageDestacados * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.events.slice(start, end);
  }

  previousPageTendencias() {
    if (this.currentPageTendencias > 0) {
      this.currentPageTendencias--;
    }
  }

  nextPageTendencias() {
    if (this.currentPageTendencias < this.totalPagesTendencias - 1) {
      this.currentPageTendencias++;
    }
  }

  previousPageDescubre() {
    if (this.currentPageDescubre > 0) {
      this.currentPageDescubre--;
    }
  }

  nextPageDescubre() {
    if (this.currentPageDescubre < this.totalPagesDescubre - 1) {
      this.currentPageDescubre++;
    }
  }

  previousPageDestacados() {
    if (this.currentPageDestacados > 0) {
      this.currentPageDestacados--;
    }
  }

  nextPageDestacados() {
    if (this.currentPageDestacados < this.totalPagesDestacados - 1) {
      this.currentPageDestacados++;
    }
  }
}
