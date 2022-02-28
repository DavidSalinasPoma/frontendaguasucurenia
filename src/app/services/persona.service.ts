
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
export class PersonaService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateUsuarios
   */
  public updatePersonas(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/persona/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showPersonas(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/persona/${id}`, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarPersonas(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }


  /**
   * cargar eventos
   */
  public buscarPersonas(formData: any): Observable<any> {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }

  /**
 * cargar eventos
 */
  public buscarPersonasCrear(formData: any): Observable<any> {
    // console.log(formData);
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/buscar/personas', formData, { headers: parameters });
  }

  // Servicio para crear un usuario
  crearPersonas(formData: any) {
    // console.log(formData);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/persona', formData, { headers: parameters });
  }

  /**
   * eliminar Evento
   */
  public eliminarPersona(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/persona/' + id, { headers: parameters });

  }

}
