import {Component} from '@angular/core';
import {Router} from '@angular/router';
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


  constructor(private router: Router, private ticketService: TicketService) {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state) {
      this.tickets = navigation.extras.state['tickets'].filter((ticket: Ticket) => ticket.quantity > 0);
      this.total = navigation.extras.state['total'];
    }
  }

  paymentMethods = [
    { name: 'Payment method 1', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/be4a29c20c176b8a39bbcca0b418fb1e57413502c18775e897e72e72fca04e27?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Payment method 2', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2971c2fbe67716e214ba59937898aa9b626df6a26c7828d4bf01c66fa9c13da9?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Payment method 3', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fce24df4dea6eabe79af4c69ba5500992bc3d14689cad32fd272f409ccf5eac5?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Payment option 1', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1c87cc1068fc0ca01115f13898be6b842adb8f7afd44da0e52ff0d6af55f71a3?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' },
    { name: 'Payment option 2', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a27ac4baf4da6086cd543a74b084cd1b9eac12b9ddc236a53d1a1173728bac5c?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81' }
  ];

  selectedMethod: string = '';

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  buyTickets(): void {
    this.router.navigate(['/purchase-success']);
    /*
    
    if (!this.selectedMethod) {
      this.errorMessage = 'Por favor, seleccione un método de pago.';
      return;
    }
  
    const ticketToBuy = {
      ...this.tickets[0],
      imageUrl: this.tickets[0].imageUrl || 'http://example.com'
    };
  
    console.log("Objeto ticket a comprar:", ticketToBuy);
  
    this.ticketService.buyTicket(ticketToBuy).subscribe({
      next: (response) => {
        this.router.navigate(['/purchase-success'], { queryParams: { ticket: JSON.stringify(ticketToBuy) } });
      },
      error: (error) => {
        console.error('Error en la operación de compra:', error);
        this.errorMessage = 'Fallo en la operación de compra: ' + error.message;
      }
    });
    */
  }
  


}
