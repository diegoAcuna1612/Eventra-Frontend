import {Component, Input} from '@angular/core';
import {Ticket} from '../../model/ticket';
import {NgClass, NgForOf} from '@angular/common';
@Component({
  selector: 'app-card-paid-tickets',
  standalone: true,
  imports: [
    NgClass,
    NgForOf

  ],
  templateUrl: './card-paid-tickets.component.html',
  styleUrl: './card-paid-tickets.component.css'
})
export class CardPaidTicketsComponent {
  @Input() title!: string;
  @Input() publicHash!: string;
  @Input() photo!: string;
}
