import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    FormsModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dropdownOpen=false;
  searchQuery: string = '';

  constructor(private router: Router, private notificationService: NotificationService) {
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['/search-event'], { queryParams: { query: this.searchQuery } });
    }
  }

  showDropdown() {
    this.dropdownOpen = true;
  }

  hideDropdown() {
    this.dropdownOpen = false;
  }

  logout(){
    localStorage.clear();
    this.notificationService.showNotification('Sesión cerrada con éxito. 6.6').then(r => r);
    setTimeout(() => {
      this.router.navigate(['/login']).then(r => r);
    }, 2000);
  }


}
