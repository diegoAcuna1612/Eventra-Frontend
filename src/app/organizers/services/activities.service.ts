// services/activities.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../model/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private endpoint = 'activities';
  private domain = environment.domain;



  
  constructor(private http: HttpClient) {}

  // Método para crear un evento
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.domain}${this.endpoint}`, activity);
  }
}
