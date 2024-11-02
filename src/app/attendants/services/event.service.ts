import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { environment } from '../../../environments/environment';
import { Activity } from '../model/activity';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    private endpoint = 'activities';
  private domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.domain}${this.endpoint}/${id}`);
  }
  getActivityById(id: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.domain}${this.endpoint}/${id}`);
  }
}
