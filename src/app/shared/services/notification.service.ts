import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.notificationSubject.next(message);
      setTimeout(() => {
        this.notificationSubject.next('');
        resolve();
      }, 1000);
    });
  }
}
