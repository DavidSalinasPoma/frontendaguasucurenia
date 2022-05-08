
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  // Token de usuario
  get token() {
    return localStorage.getItem('token');
  }

  // Reportes cobros por mes
  public cobrosxMes(formData: any) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + `/api/indexreportes/cobroxmes`, formData, { headers: parameters });
  }

  // Reportes Listas socios cobros por mes
  public cobrosxMesSocios(formData: any) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + `/api/indexreportes/cobroxmesocios`, formData, { headers: parameters });
  }

  // Reportes Listas socios cobros por mes
  public listaDeudores(formData: any) {

    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token);
    return this.http.post<any>(base_url + `/api/indexreportes/listaDeudores`, formData, { headers: parameters });
  }

}
