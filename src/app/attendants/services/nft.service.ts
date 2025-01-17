import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NftService {
  private endpoint='nft'
  private domain: string|undefined;
  constructor(private http: HttpClient) { 
      this.domain = environment.nft;
  }

  
  /*createNft(data: { name: string; creator: string; metadata: string }): Observable<any> {
    return this.http.post(`${this.domain}${this.endpoint}/create`, {});
  }
*/
    
createNft() {
    const url = 'http://localhost:5000/api/nft/create';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
        name: localStorage.getItem('eventName') || 'Evento sin nombre',
        creator:  crypto.randomUUID(),
        metadata:{
            image: localStorage.getItem('photo'),
            description:localStorage.getItem('description'),
        },

    };

    this.http.post(url, body, { headers }).subscribe(
        (response) => {
        console.log('NFT creado exitosamente:', response);
        },
        (error) => {
        console.error('Error al crear el NFT:', error);
        }
    );
    }

  sendCurlRequest(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.domain}${this.endpoint}/create`, data, { headers });
  }
  


}
