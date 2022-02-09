
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
export class SociosService {

  public nombreEvento = new EventEmitter<{}>();

  constructor(private http: HttpClient, private router: Router) { }


  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * updateUsuarios
   */
  public updateSocios(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.put(base_url + `/api/socio/${id}`, formData, { headers: parameters });
  }

  /**
   * cargarUsuarios
   */
  public showEventos(id: number) {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/Socio/${id}`, { headers: parameters });
  }

  /**
  * cargarSocios
  */
  public showSocios(id: number) {
    // console.log(params);
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + `/api/show/showsocios/${id}`, { headers: parameters });
  }


  /**
   * cargarUsuarios
   */
  public cargarSocios(params: string) {
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



  // Servicio para crear un usuario
  crearSocio(formData: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post(base_url + '/api/socio', formData, { headers: parameters });
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
  * cargarPersonas
  */
  public cargarPersonas() {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + '/api/persona', { headers: parameters });
  }

  /**
  * cargarBarrios
  */
  public cargarBarrios() {
    // console.log(params);

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + '/api/barrio', { headers: parameters });
  }


}
