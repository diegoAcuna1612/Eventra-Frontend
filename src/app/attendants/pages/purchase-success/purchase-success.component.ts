import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../model/ticket';
import {CardTicketComponent} from '../../components/card-ticket/card-ticket.component';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [
    CardTicketComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tickets = JSON.parse(params['tickets']);
    });
  }
}
