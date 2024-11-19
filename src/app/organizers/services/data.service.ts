import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface GeneralDataResponse {
  interaccion: number;
  aforum: number;
  actual: number;
  male: number;
  female: number;
  averageAge: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.domain}data`;

  constructor(private http: HttpClient) {}

  getStatisticsById(id: number): Observable<GeneralDataResponse> {
    return this.http.get<GeneralDataResponse>(`${this.apiUrl}/${id}`);
  }
}
