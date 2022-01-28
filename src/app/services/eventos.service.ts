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
export class EventosService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateEventos
   */
  public updateEventos(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put<any>(base_url + `/api/evento/${id}`, formData, { headers: parameters });
  }

  /**
 * updateProductos
 */
  public updateProductos(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put<any>(base_url + `/api/producto/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showEventos(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/evento/${id}`, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarEventos(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(params, { headers: parameters });
  }


  /**
   * cargar eventos
   */
  public buscarEventos(formData: any): Observable<any> {
    // console.log(formData);


    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(formData.url, formData, { headers: parameters });
  }



  // Servicio para crear un evento
  crearEvento(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + '/api/evento', formData, { headers: parameters });
  }

  // Servicio para crear un producto
  crearProducto(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/producto', formData, { headers: parameters });
  }

  /**
   * eliminar Evento
   */
  public eliminarEvento(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/evento/' + id, { headers: parameters });

  }

  /**
   * eliminar Producto
   */

  public eliminarProducto(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put<any>(base_url + `/api/delete/productos/${id}`, formData, { headers: parameters });
  }
}
