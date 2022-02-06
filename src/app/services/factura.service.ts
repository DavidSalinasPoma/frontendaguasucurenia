
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

// El tap dispara un efecto secundario
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  // Servicio para crear un usuario
  crearFactura(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/factura', formData, { headers: parameters });
  }

  /**
  * cargarUsuarios
  */
  public showFacturas(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/factura/${id}`, { headers: parameters });
  }


  /**
   * updateFactura
   */
  public updateFactura(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put<any>(base_url + `/api/factura/${id}`, formData, { headers: parameters });
  }


  /**
* cargarUsuarios
*/
  public retrasoFactura(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/show/retrasofactura/${id}`, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarFacturas(params: string) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }

  /**
  * cargar eventos
  */
  public buscarFacturas(formData: any): Observable<any> {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }


}
