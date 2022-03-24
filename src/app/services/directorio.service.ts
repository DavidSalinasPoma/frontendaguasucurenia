import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from 'src/environments/environment';


// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {



  constructor(
    private http: HttpClient
  ) { }

  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  /**
  * reporteDirectorio
  */
  public reporteDirectorio() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.get<any>(base_url + '/api/index/reportedirectorio', { headers: parameters });
  }

}
