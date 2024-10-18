import { Routes } from '@angular/router';
import { CustomizeEventComponent } from './organizers/components/customize-event/customize-event.component';
import { ReviewEventRequestsComponent } from './organizers/components/review-event-requests/review-event-requests.component';
import { EventStatisticsComponent } from './organizers/components/event-statistics/event-statistics.component';
export const routes: Routes = [
    {path:'customize-event', component: CustomizeEventComponent},
    {path:'review-event-requests', component: ReviewEventRequestsComponent},
    {path:'event-statistics', component: EventStatisticsComponent},
];
