// event-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionPages {
  private eventIdSource = new BehaviorSubject<string | null>(null); // Almacena el `eventId`
  currentEventId$ = this.eventIdSource.asObservable(); // Observable para escuchar cambios en `eventId`

  setEventId(eventId: string) {
    this.eventIdSource.next(eventId); // Actualiza el valor de `eventId`
    console.log(`SI LLEGO EL VALOR DEL ID: ${eventId}`); // Imprime el mensaje en el servicio
  }

  clearEventId() {
    this.eventIdSource.next(null); // Limpia el `eventId`
  }
}
