import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEventRequestsComponent } from './review-event-requests.component';

describe('ReviewEventRequestsComponent', () => {
  let component: ReviewEventRequestsComponent;
  let fixture: ComponentFixture<ReviewEventRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewEventRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEventRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
