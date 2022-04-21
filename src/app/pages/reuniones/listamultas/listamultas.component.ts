import { DetallereunionService } from './../../../services/detallereunion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleReuniones } from 'src/app/models/detalleReuniones.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listamultas',
  templateUrl: './listamultas.component.html',
  styleUrls: ['./listamultas.component.css']
})
export class ListamultasComponent implements OnInit {

  public cargando: boolean = true;
  public idReunion: number;
  public listas: DetalleReuniones[] = [];

  public reunion: string = '';
  public multa: string = '';
  public fecha: string = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private detalleReunionServices: DetallereunionService,
    private router: Router,
  ) {
    this.idReunion = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.cargarListasDetalles();
  }


  /**
 * cargarUsuario
 */
  public cargarListasDetalles() {


    // Loading
    this.cargando = true;

    this.detalleReunionServices.indexReporte(this.idReunion)
      .subscribe(({ detalle }) => {

        if (detalle.length === 0) {
          this.router.navigate(['/dashboard/detalleReunion', this.idReunion]);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este item no tiene ningun registro!',
            footer: 'Inserte nuevos registros'
          })
        } else {
          this.reunion = detalle[0].reunion;
          this.multa = detalle[0].multa;
          this.fecha = detalle[0].fecha;

          let myArrayOf$: Observable<any>;

          myArrayOf$ = of(detalle);

          myArrayOf$.pipe(map((data, index) => {
            data[index].estado = Number(data[index].estado);
            return data;
          }))
            .subscribe(resp => {
              this.listas = resp;
              // console.log(this.listas);


            })
          this.cargando = false;
        }
      }, (err => {
        console.log(err);

      })
      )
  }

}
