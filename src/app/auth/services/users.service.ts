import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';
import {Client} from '../model/client';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint='users'
  private endpointBusiness='businesses'
  private endpointClient='clients'
  private domain: string|undefined;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
      this.domain = environment.domain;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('userId');
  }

  loginn(){
    this.isAuthenticatedSubject.next(true);
  }

  logout(){
    localStorage.removeItem('userId');
    this.isAuthenticatedSubject.next(false);
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
  getApiURLBusiness(): string {
    return this.domain + this.endpointBusiness;
  }
  getApiUrlClient(): string {
    return this.domain + this.endpointClient;
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.domain}${this.endpointClient}`, client);
  }
  


}
