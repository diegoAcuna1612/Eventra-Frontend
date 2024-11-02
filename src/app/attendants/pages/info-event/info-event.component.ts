import { Component } from '@angular/core';
import {CardDetailEventComponent} from '../../components/card-detail-event/card-detail-event.component';
import {Event} from '../../model/event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-event',
  standalone: true,
  imports: [
    CardDetailEventComponent

  ],
  templateUrl: './info-event.component.html',
  styleUrl: './info-event.component.css'
})
export class InfoEventComponent {
  event!: Event;
  vipTickets: number = 0;
  plateaTickets: number = 0;
  generalTickets: number = 0;
  total: number = 0;

  constructor( private router: Router) {
    this.event = {
      id:'1',
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

  increaseTickets(type: string) {
    if (type === 'vip') {
      this.vipTickets++;
    } else if (type === 'platea') {
      this.plateaTickets++;
    } else if (type === 'general') {
      this.generalTickets++;
    }
    this.updateTotal();
  }

  decreaseTickets(type: string) {
    if (type === 'vip' && this.vipTickets > 0) {
      this.vipTickets--;
    } else if (type === 'platea' && this.plateaTickets > 0) {
      this.plateaTickets--;
    } else if (type === 'general' && this.generalTickets > 0) {
      this.generalTickets--;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.total = (this.vipTickets * 450) + (this.plateaTickets * 250) + (this.generalTickets * 125);
  }

  buyTickets() {
    const tickets = [
      { type: 'VIP Golden Access', quantity: this.vipTickets, price: 450 },
      { type: 'Platea', quantity: this.plateaTickets, price: 250 },
      { type: 'General', quantity: this.generalTickets, price: 125 }
    ];

    this.router.navigate(['/choose-payment-method'], {state: {tickets, total: this.total}}).then(r => console.log(r));
   }


}
