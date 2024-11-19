import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../auth/model/user';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  user: any;

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    this.user = {
      photo:'path/to/default/photo.jpg'
    }
  }

  logout() {
    localStorage.clear();
    this.notificationService.showNotification('Sesión cerrada con éxito. 6.6').then(r => r);
    setTimeout(() => {
      this.router.navigate(['/login']).then(r => r);
    }, 2000);
  }

}

