import {RouterModule, Routes} from '@angular/router';
import {SearchEventComponent} from './attendants/pages/search-event/search-event.component';
import {NgModule} from '@angular/core';
import {MainComponent} from './attendants/pages/main/main.component';
import {InfoEventComponent} from './attendants/pages/info-event/info-event.component';
import {ChoosePaymentMethodComponent} from './attendants/pages/choose-payment-method/choose-payment-method.component';
import {PurchaseSuccessComponent} from './attendants/pages/purchase-success/purchase-success.component';
import {UpdateProfileComponent} from './auth/pages/update-profile/update-profile.component';
import {MyTicketsComponent} from './attendants/pages/my-tickets/my-tickets.component';
import {LoginComponent} from './auth/pages/login/login.component';
import {RegisterComponent} from './auth/pages/register/register.component';
import {RecoverPasswordComponent} from './auth/pages/recover-password/recover-password.component';
import {ConfirmPasswordComponent} from './auth/pages/confirm-password/confirm-password.component';
import {VerifyEmailComponent} from './auth/pages/verify-email/verify-email.component';
import { ReviewEventRequestsComponent } from './organizers/components/review-event-requests/review-event-requests.component';
import { EventStatisticsComponent } from './organizers/components/event-statistics/event-statistics.component';
import {CreateEventComponent} from './organizers/pages/create-event/create-event.component';
import {StatisticsComponent} from './organizers/pages/statistics/statistics.component';

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'search-event', component: SearchEventComponent },
  { path: 'info-event/:id', component: InfoEventComponent },
  { path: 'choose-payment-method/:id', component: ChoosePaymentMethodComponent },
  { path: 'purchase-success', component: PurchaseSuccessComponent },
  { path: 'my-tickets', component: MyTicketsComponent },

  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'confirm-password', component: ConfirmPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  {path: 'create-event', component: CreateEventComponent},


  //{path:'customize-event', component: CustomizeeEventComponent},
  {path:'review-event-requests', component: ReviewEventRequestsComponent},
  {path:'event-statistics', component: StatisticsComponent},

  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

