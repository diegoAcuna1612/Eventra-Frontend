import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CardTicketComponent} from '../../components/card-ticket/card-ticket.component';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-choose-payment-method',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    CardTicketComponent,
    NgIf
  ],
  templateUrl: './choose-payment-method.component.html',
  styleUrl: './choose-payment-method.component.css'
})
export class ChoosePaymentMethodComponent{
  tickets: Ticket[] = [];
  total: number = 0;
  errorMessage: string = '';
  selectedMethod: string = '';
  eventId: string | null = null;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.tickets = navigation.extras.state['tickets'].filter((ticket: Ticket) => ticket.quantity > 0);
      this.total = navigation.extras.state['total'];
    }
  }
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }
  paymentMethods = [
    { name: 'Pago Efectivo', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/be4a29c20c176b8a39bbcca0b418fb1e57413502c18775e897e72e72fca04e27?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Niubiz', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2971c2fbe67716e214ba59937898aa9b626df6a26c7828d4bf01c66fa9c13da9?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'BNB Chain', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fce24df4dea6eabe79af4c69ba5500992bc3d14689cad32fd272f409ccf5eac5?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Visa', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1c87cc1068fc0ca01115f13898be6b842adb8f7afd44da0e52ff0d6af55f71a3?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Solana', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a27ac4baf4da6086cd543a74b084cd1b9eac12b9ddc236a53d1a1173728bac5c?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' }
  ];


  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    console.log('Método de pago seleccionado:', method);
  }

  buyTickets(): void {

    const userId = localStorage.getItem('userId');

    console.log('ID del evento:', this.eventId);
    console.log('ID del usuario:', userId);
    console.log('Método de pago seleccionado:', this.selectedMethod);

    const ticketData = {
      idTicket: Number(this.eventId), 
      idClient: Number(userId),    
      methodPayment: this.selectedMethod.toUpperCase().replace(" ", "_") 
    };
    this.ticketService.buyTicket(ticketData).subscribe(
      (response) => {
        console.log('Compra realizada con éxito:', response);
        this.router.navigate(['/purchase-success']);
      },
      (error) => {
        console.error('Error en la compra:', error);
        this.errorMessage = 'Error en la compra. Inténtalo de nuevo.';
      }
    );

  }
  


}
