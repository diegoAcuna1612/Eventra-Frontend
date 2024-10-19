import {Component, Input} from '@angular/core';
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
export class SidebarComponent {
  @Input() user!: User;

  constructor(private router: Router, private notificationService: NotificationService) {}

  logout() {
    localStorage.clear();
    this.notificationService.showNotification('Sesión cerrada con éxito. 6.6').then(r => r);
    setTimeout(() => {
      this.router.navigate(['/login']).then(r => r);
    }, 2000);
  }

}
