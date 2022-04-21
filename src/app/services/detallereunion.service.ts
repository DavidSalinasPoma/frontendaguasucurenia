
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DetallereunionService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }

  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * update detalle reunion
   */
  public updateDetallesReunion(formData: any, id: string) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/detalleReunion/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showBarrios(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/barrio/${id}`, { headers: parameters });
  }

  /**
   * cargar reuniones
   */
  public indexDetalleReuniones(params: string) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }

  /**
   * cargar reuniones
   */
  public indexReporte(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + '/api/indexlista/detalleReunion/' + id, { headers: parameters });
  }


  /**
   * cargar eventos
   */
  public buscarReuniones(formData: any): Observable<any> {
    // console.log(formData);


    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }

  /**
* cargar eventos
*/
  public buscarBarriosCrear(formData: any): Observable<any> {
    // console.log(formData);
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/buscar/barrios', formData, { headers: parameters });
  }

  // Servicio para crear Reuniones
  public storeReunion(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/reunion', formData, { headers: parameters });
  }

  /**
   * eliminar Evento
   */
  public eliminarBarrio(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/barrio/' + id, { headers: parameters });

  }

}
