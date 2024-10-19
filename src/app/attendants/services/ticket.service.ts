import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];

  setTickets(tickets: Ticket[]): void {
    this.tickets = tickets;
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }
}
