
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

// El tap dispara un efecto secundario
import { Observable, of } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AperturasService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token 
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * update
   */
  public updateAperturas(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/apertura/${id}`, formData, { headers: parameters });
  }

  /**
   * cargar
   */
  public showAperturas(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/apertura/${id}`, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarAperturas(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }


  /**
   * cargar 
   */
  public buscarAperturas(formData: any): Observable<any> {
    // console.log(formData);


    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }

  /**
* cargar 
*/
  public buscarAperturasCrear(formData: any): Observable<any> {
    // console.log(formData);
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/buscar/barrios', formData, { headers: parameters });
  }


  // Servicio para crear 
  crearApertura(formData: any) {
    // console.log(formData);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/barrio', formData, { headers: parameters });
  }

  /**
   * eliminar
   */
  public eliminarApertura(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/barrio/' + id, { headers: parameters });

  }

}
