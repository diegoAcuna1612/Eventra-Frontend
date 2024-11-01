import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client } from '../../auth/model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private endpoint = 'clients';
  private domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.domain}${this.endpoint}`);
  }
}
