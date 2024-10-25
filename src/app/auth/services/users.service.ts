import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint='users'
  private domain: string|undefined;
  constructor(private http: HttpClient) { 
      this.domain = environment.domain;
  }
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.domain}${this.endpoint}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.domain}${this.endpoint}/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.domain}${this.endpoint}/login`, user);
  }
}
