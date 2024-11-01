// src/app/services/activities.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCard } from '../model/event-card';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private endpoint='activities/cards'
  private domain: string|undefined;
  constructor(private http: HttpClient) { 
      this.domain = environment.domain;
  }

  getActivitiesByType(type: 'TRENDING' | 'FEATURED' | 'DISCOVER'): Observable<EventCard[]> {
    return this.http.get<EventCard[]>(`${this.domain}${this.endpoint}/${type}`);
  }
}
