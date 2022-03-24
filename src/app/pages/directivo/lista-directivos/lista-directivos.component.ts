
import { Component, OnInit } from '@angular/core';

// Servicios
import { DirectorioService } from 'src/app/services/directorio.service';

@Component({
  selector: 'app-lista-directivos',
  templateUrl: './lista-directivos.component.html',
  styleUrls: ['./lista-directivos.component.css']
})
export class ListaDirectivosComponent implements OnInit {

  public cargando: boolean = true;
  public directivos: any = [];
  constructor(private servicesDirectivos: DirectorioService) { }

  ngOnInit(): void {
    this.cargarDirectorios();
  }

  /**
   * cargarDirectorios
   */
  public cargarDirectorios() {
    this.servicesDirectivos.reporteDirectorio().subscribe(({ directivos }) => {
      this.directivos = directivos;
      this.cargando = false;
    });
  }

}
