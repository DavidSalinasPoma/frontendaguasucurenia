import { FacturaService } from './../../../services/factura.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalDeudoresComponent } from './modal-deudores/modal-deudores.component';
import { SociosService } from 'src/app/services/socios.service';
declare var covertirNumLetras: any;

interface Mes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-socionocobro',
  templateUrl: './socionocobro.component.html',
  styleUrls: ['./socionocobro.component.css']
})
export class SocionocobroComponent implements OnInit {

  public meses: Mes[] = [
    { value: 'enero', viewValue: 'Enero' },
    { value: 'febrero', viewValue: 'Febrero' },
    { value: 'marzo', viewValue: 'Marzo' },
    { value: 'abril', viewValue: 'Abril' },
    { value: 'mayo', viewValue: 'Mayo' },
    { value: 'junio', viewValue: 'Junio' },
    { value: 'julio', viewValue: 'Julio' },
    { value: 'agosto', viewValue: 'Agosto' },
    { value: 'septiembre', viewValue: 'Septiembre' },
    { value: 'octubre', viewValue: 'Octubre' },
    { value: 'noviembre', viewValue: 'Noviembre' },
    { value: 'diciembre', viewValue: 'Diciembre' },
  ];

  // Loading
  public cargando: boolean = true;

  public mostrar: boolean = true;

  public listaSociosPagaron: any;
  public listaDirectivosBeneficiarios: any;
  public listaDeudores: any = [];

  public sumaTotal: number = 0;
  public sumaTotalBeneficiario: number = 0;

  // Fecha reporte
  public fechaReporte = new Date();

  public socio: any = [];
  public detalle: any = [];
  public total: number = 0;
  public retraso: boolean = false;
  public mostrarDirectivo: boolean = false;
  public facturaReunion: any = [];
  public letras: string = '';


  constructor(
    private reporteServices: ReportesService,
    private sociosServices: SociosService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.listaSociosDeudores();
  }

  /**
   * listaDeudores
   */
  public listaSociosDeudores() {
    this.reporteServices.listaDeudores().subscribe(
      (
        { listaCorte }
      ) => {
        let sumaTotal = 0;
        listaCorte.forEach((element: any) => {
          sumaTotal = sumaTotal + Number(element.cantMeses);
        });
        this.total = sumaTotal;
        // Implementando logica de rxjs of es sincrono
        let myArrayOf$: Observable<any>;
        myArrayOf$ = of(...listaCorte);
        myArrayOf$
          .pipe(
            map(data => {
              // console.log(data);
              data.cantMeses = Number(data.cantMeses);
              // console.log(data);

              this.sociosServices.showSocios(data.idSocio)
                .subscribe(({ socio }) => {

                  console.log(socio);

                  const datosSocio = {
                    nombre: socio.persona.nombres,
                    paterno: socio.persona.ap_paterno,
                    materno: socio.persona.ap_materno,
                    carnet: socio.persona.carnet,
                  };
                  const finalResult = Object.assign(data, datosSocio);

                  this.listaDeudores.push(finalResult);
                })
            })
          )
          .subscribe();
        this.cargando = false;

      }, (err) => {
        console.log(err);

      }
    )
  }

  public openDialog(idSocio: number) {

    const dialogRef = this.dialog.open(ModalDeudoresComponent, {
      data: { idSocio: idSocio }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public crearPDF() {

  }

}
