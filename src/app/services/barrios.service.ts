import { Usuario } from './../models/usuario.model';
import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';
import { LoginForm } from './../interfaces/login-form.interface';
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
export class BarriosService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateUsuarios
   */
  public updateBarrios(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/barrio/${id}`, formData, { headers: parameters });
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
   * cargarUsuarios
   */
  public cargarBarrios(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }


  /**
   * cargar eventos
   */
  public buscarBarrios(formData: any): Observable<any> {
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


  // Servicio para crear un usuario
  crearBarrio(formData: any) {
    // console.log(formData);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/barrio', formData, { headers: parameters });
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
