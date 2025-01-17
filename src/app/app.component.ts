import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {MainComponent} from './attendants/pages/main/main.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NavbarAuthComponent} from './shared/components/navbar-auth/navbar-auth.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {NotificationService} from './shared/services/notification.service';

import { HeaderComponent } from './shared/components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {UsersService} from './auth/services/users.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    NavbarAuthComponent,
    HeaderComponent,
    InputTextModule,
    FloatLabelModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>;

  notificationMessage: string = '';

  constructor(private notificationService: NotificationService, private usersService: UsersService) {
    this.isAuthenticated$ = this.usersService.isAuthenticated$;
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
      setTimeout(() => {
        this.notificationMessage = '';
      }, 3000);
    });
  }
/*
  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }*/
}
