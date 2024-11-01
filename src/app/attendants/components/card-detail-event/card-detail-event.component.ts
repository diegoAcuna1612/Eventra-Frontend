import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Event} from '../../model/event';
import {NgForOf} from '@angular/common';

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
  event!: Event;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const eventTitle = params['title'];
      // Aquí deberías obtener los detalles del evento basado en el título
      // Por ejemplo, podrías hacer una llamada a un servicio para obtener los datos del evento
      this.event = this.getEventDetails(eventTitle);
    });
  }

  getEventDetails(title: string): Event {
    // Lógica para obtener los detalles del evento basado en el título
    // Esto es solo un ejemplo, deberías reemplazarlo con la lógica real
    return {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f2790b2b367c665857d18185698c40babd0f2cce934fe331ae413b7e0a65d55f?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81",
      title: 'Billie Eilish - IILU 204',
      description: 'Events HerePeru se enorgullece de presentar, junto a Pepsi e Interbank, un evento histórico: Billie Eilish en concierto. Con 7 premios Grammy en su haber, Billie es una de las artistas más influyentes de la actualidad, conocida por su estilo único y revolucionario. No te pierdas la oportunidad de verla en un espectáculo inolvidable que tendrá lugar en una fecha doble.',
      fecha: '3 de noviembre 2024',
      tags: ['Musica', 'Cumbia', 'Salsa', 'Varios', 'Baile'],
      price: 50,
      location: 'Lima, Peru',
      rating: 4.5,
      hour: '8:00 PM',
    };
  }

}
