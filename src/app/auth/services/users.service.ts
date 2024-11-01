import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';
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
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.domain}${this.endpoint}/${userId}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.domain}${this.endpoint}/register`, user);
  }

  loginUser(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.domain}${this.endpoint}/login`, user);
  }
}
