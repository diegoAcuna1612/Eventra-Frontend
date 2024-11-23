import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaidTicketsComponent } from './card-paid-tickets.component';

describe('CardPaidTicketsComponent', () => {
  let component: CardPaidTicketsComponent;
  let fixture: ComponentFixture<CardPaidTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPaidTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPaidTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
