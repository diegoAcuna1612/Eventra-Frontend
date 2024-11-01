import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventService {
    private endpoint = 'activities';
  private domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  // Método para obtener un evento por ID desde la API
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.domain}${this.endpoint}/${id}`);
  }
}
