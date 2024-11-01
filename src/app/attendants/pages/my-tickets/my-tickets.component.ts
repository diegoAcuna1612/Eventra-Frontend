import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {User} from '../../../auth/model/user';
import {CardTicketComponent} from '../../components/card-ticket/card-ticket.component';
import {NgForOf} from '@angular/common';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    CardTicketComponent,
    NgForOf
  ],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent implements OnInit{
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
  }

/*
  user: User = {
    id: '78231412',
    username: 'Gustyes',
    fullname: '',
    email: 'byroyzgg@gmail.com',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/34c63062a481ae39cff589f67803156d9da846fce3ba350d925d8a7e8e8ee930?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
    birthdate: '',
    dni: '',
    country: '',
    gender: '',
    address: '',
    phone: '',

  };*/

}
