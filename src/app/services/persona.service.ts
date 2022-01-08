import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  constructor(private http: HttpClient, private router: Router) { }

  // Saca el token del local Storage
  get token() {
    return localStorage.getItem('token');
  }

  /**
   * cargarPersonas
   */
  public cargarPersonas(): Observable<any> {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any[]>(base_url + '/api/persona', { headers: parameters });
  }
}
