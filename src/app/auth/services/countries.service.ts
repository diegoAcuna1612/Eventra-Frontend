import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://api.first.org/data/v1/countries';
  private endpoint='users'
  private domain: string|undefined;
  constructor(private http: HttpClient) { 
      this.domain = environment.domain;
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
