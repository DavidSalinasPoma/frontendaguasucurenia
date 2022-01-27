
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
export class LecturaService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateUsuarios
   */
  public updateLectura(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/lista/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showLecturas(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/socio/${id}`, { headers: parameters });
  }

  /**
   * showConsumos
   */
  public showConsumos(formData: any) {
    // console.log(formData);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/desplegar/consumos', formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarLectura(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }


  /**
   * cargar eventos
   */
  public buscarSocios(formData: any): Observable<any> {
    // console.log(formData);


    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }


  /**
   * eliminar Evento
   */
  public eliminarSocio(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/socio/' + id, { headers: parameters });

  }

  /**
   * cuboPrecio
   */
  public cuboPrecio(formData: any) {
    // console.log(formData);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/desplegar/precios', formData, { headers: parameters });
  }

}

