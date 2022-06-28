import { Injectable } from '@angular/core';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

// Para las peticiones http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturaReunionService {

  constructor(
    private http: HttpClient,
    private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
  * index factura reunión
  */
  public indexFacturaReunion(data: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/indexfacturareunion', data, { headers: parameters });
  }

  public updatedFacturaReunion(data: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put<any>(base_url + '/api/facturaReunion/' + data.id, data, { headers: parameters });
  }

}
