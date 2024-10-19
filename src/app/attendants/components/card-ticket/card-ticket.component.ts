import {Component, Input} from '@angular/core';
import {Ticket} from '../../model/ticket';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-card-ticket',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './card-ticket.component.html',
  styleUrl: './card-ticket.component.css'
})
export class CardTicketComponent {
  @Input() ticket!: Ticket;

}
