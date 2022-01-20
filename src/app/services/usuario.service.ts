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
export class UsuarioService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateUsuarios
   */
  public updateUsuarios(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/user/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showUsuarios(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/user/${id}`, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public cargarUsuarios(params: string) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<CargarUsuario>(params, { headers: parameters });
  }


  /**
   * cargarUsuarios
   */
  public cargarUsuariosBuscar(formData: any): Observable<any> {
    // console.log(formData);


    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<CargarUsuario>(formData.url, formData, { headers: parameters });
  }

  /**
   * logout
   */
  public logout() {

    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('urlPagination');
    localStorage.removeItem('paramsUrl');
    localStorage.removeItem('usuario');
    localStorage.removeItem('acces');

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + token);
    return this.http.post(base_url + '/api/logout', '', { headers: parameters });

  }

  // Validar token
  /**
   * validarToken
   */
  public validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/login/renew`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  // Servicio para crear un usuario
  crearUsuario(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/register', formData, { headers: parameters });
  }

  // Servicio para el login
  /**
   * login
   */
  public login(formData: LoginForm) {
    return this.http.post(`${base_url}/api/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  /**
   * eliminarUsuario
   */
  public eliminarUsuario(id: number) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.delete(base_url + '/api/user/' + id, { headers: parameters });

  }


  /**
   * cargarUsuarios
   */
  public cargarPersonas() {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + '/api/persona', { headers: parameters });
  }

}
