import { Component } from '@angular/core';
import {CardDetailEventComponent} from '../../components/card-detail-event/card-detail-event.component';
import {Activity} from '../../model/activity';
import { ActivatedRoute, Router } from '@angular/router';
import {EventService} from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
@Component({
  selector: 'app-info-event',
  standalone: true,
  imports: [
    CardDetailEventComponent,
    CommonModule

  ],
  templateUrl: './info-event.component.html',
  styleUrl: './info-event.component.css'
})
export class InfoEventComponent {
  event!: Activity;
  
  vipTickets: number = 0;
  plateaTickets: number = 0;
  generalTickets: number = 0;
 
 
  tickets: any[] = [];
  quantities: { [key: number]: number } = {};
  total: number = 0;
  eventId: string = ''; // Almacena el `eventId` aquí


  constructor(   private route: ActivatedRoute, 
    private router: Router,
    private eventService: EventService,
    private ticketService: TicketService 
  ) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.eventId = eventId; // Asigna `eventId` a la propiedad del componente
        console.log("SI LLEGO EL VALOR DEL ID al info:", eventId);
        this.loadEventDetails(eventId); 
        this.loadTickets(eventId); // Llama al método para cargar los tickets

      }
    });
  }
  loadTickets(eventId: string) {
    this.ticketService.getTicketsEventsById(eventId).subscribe(
      (ticketData) => {
        this.tickets = ticketData; // Almacena los tickets en la propiedad `tickets`
        this.initializeQuantities(); // Inicializa las cantidades a 0
      },
      (error) => {
        console.error('Error al cargar los tickets:', error);
      }
    );
  }
  loadEventDetails(eventId: string) {
    /*
    this.eventService.getActivityById(eventId).subscribe(
      (activityData) => {
        // Asigna directamente los datos de `activityData` al `event`
        this.event = {
          id: activityData.id,
          name: activityData.name || 'Título por defecto',
          description: activityData.description || 'Descripción por defecto',
          photo: activityData.photo || '',
          location: activityData.location || 'Ubicación no disponible',
          tags: activityData.tags || [],
          fechas_eventos: activityData.fechas_eventos || [],
          tickets: activityData.tickets || [],
          businessId: activityData.businessId || ''
        };
  
        // Opcionalmente, puedes extraer precios de `tickets` para cálculos de entradas
        const vipTicket = activityData.tickets.find(ticket => ticket.name === 'VIP Golden Access');
        const plateaTicket = activityData.tickets.find(ticket => ticket.name === 'Platea');
        const generalTicket = activityData.tickets.find(ticket => ticket.name === 'General');
  
        //this.updateTicketPrices(vipTicket, plateaTicket, generalTicket);
      },
      (error) => {
        console.error('Error al cargar los datos del evento:', error);
      }
    );
    */
    this.eventService.getActivityById(eventId).subscribe(
      (activityData) => {
        this.event = activityData;

            // Almacena el nombre del evento en localStorage
        if (this.event?.name) {
          localStorage.setItem('eventName', this.event.name);
          localStorage.setItem('photo', this.event.photo);
          localStorage.setItem('description', this.event.description);

          console.log('Nombre del evento almacenado en localStorage:', this.event.name);
        }
      },
      (error) => {
        console.error('Error al cargar los datos del evento:', error);
      }
    );
  }
  
  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${dayName}: ${day}/${month}/${year} ${hours}:${minutes}`;
  }

  initializeQuantities() {
    this.tickets.forEach(ticket => {
      this.quantities[ticket.idTicket] = 0;
    });
  }
  increaseTickets(idTicket: number) {
    /*
    if (type === 'vip') {
      this.vipTickets++;
    } else if (type === 'platea') {
      this.plateaTickets++;
    } else if (type === 'general') {
      this.generalTickets++;
    }
    this.updateTotal();*/
    if (this.quantities[idTicket] !== undefined) {
      this.quantities[idTicket]++;
      this.updateTotal();
    }
  }

  decreaseTickets(
    //type: string
    idTicket: number
  ) {
    /*
    if (type === 'vip' && this.vipTickets > 0) {
      this.vipTickets--;
    } else if (type === 'platea' && this.plateaTickets > 0) {
      this.plateaTickets--;
    } else if (type === 'general' && this.generalTickets > 0) {
      this.generalTickets--;
    }
    this.updateTotal();*/

    if (this.quantities[idTicket] > 0) {
      this.quantities[idTicket]--;
      this.updateTotal();
    }
  }

  updateTotal() {
    //this.total = (this.vipTickets * 450) + (this.plateaTickets * 250) + (this.generalTickets * 125);
    this.total = this.tickets.reduce(
      (sum, ticket) => sum + ticket.price * (this.quantities[ticket.idTicket] || 0),
      0
    );
  }

  buyTickets() {
    /*
    const tickets = [
      { type: 'VIP Golden Access', quantity: this.vipTickets, price: 450 },
      { type: 'Platea', quantity: this.plateaTickets, price: 250 },
      { type: 'General', quantity: this.generalTickets, price: 125 }
    ];
  
    // Navega a `choose-payment-method/{eventId}` pasando `tickets` y `total` en el estado
    this.router.navigate([`/choose-payment-method`, this.eventId], { state: { tickets, total: this.total } })
      .then(r => console.log("Navegación exitosa:", r));*/

    const selectedTickets = this.tickets.map(ticket => ({
      type: ticket.name,
      quantity: this.quantities[ticket.idTicket] || 0,
      price: ticket.price,
    }));

    this.router.navigate([`/choose-payment-method`, this.eventId], { state: { tickets: selectedTickets, total: this.total } })
      .then(r => console.log('Navegación exitosa:', r));
}


}
