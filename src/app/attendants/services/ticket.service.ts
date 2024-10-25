import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private endpoint='tickets'
  private domain: string|undefined;
  constructor(private http: HttpClient) { 
      this.domain = environment.domain;
  }
  
  private tickets: Ticket[] = [];

  setTickets(tickets: Ticket[]): void {
    this.tickets = tickets;
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.domain}${this.endpoint}`);
  }
  buyTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(`${this.domain}${this.endpoint}/buy`, ticketData);
  }

  getTicketById(ticketId: string): Observable<any> {
    return this.http.get(`${this.domain}${this.endpoint}/${ticketId}`);
  }

}
