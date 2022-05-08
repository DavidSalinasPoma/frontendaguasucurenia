import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


interface Mes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sociocobro',
  templateUrl: './sociocobro.component.html',
  styleUrls: ['./sociocobro.component.css']
})
export class SociocobroComponent implements OnInit {

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


  // Formularios
  public formulario!: FormGroup;

  // Loading
  public cargando: boolean = false;

  public mostrar: boolean = false;

  public listaSociosPagaron: any = [];
  public listaDirectivosBeneficiarios: any = [];

  public sumaTotal: number = 0;
  public sumaTotalBeneficiario: number = 0;

  // Fecha reporte
  public fechaReporte = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private reporteServices: ReportesService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  /**
 * formulario
 */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      mes: ['', [Validators.required]],
      anio: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
    });
  }
  get anio() {
    return this.formulario.get('anio');
  }
  get mes() {
    return this.formulario.get('mes');
  }

  /**
   * onSubmit
   */
  public onSubmit(event: any) {
    this.cargando = true
    this.reporteServices.cobrosxMesSocios(this.formulario.value)
      .subscribe((
        {
          listaSociosPagaron,
          listaDirectivosBeneficiarios,
        }) => {

        // console.log(listaSociosPagaron);

        // Implementando logica de rxjs
        let myArrayOf$: Observable<any>;

        myArrayOf$ = of(...listaSociosPagaron);
        myArrayOf$
          .pipe(
            map(data => {
              // console.log(data);
              data.directivo = Number(data.directivo);
              this.listaSociosPagaron.push(data);
            })
          )
          .subscribe();

        // Implementando logica de rxjs
        let myArrayOf2$: Observable<any>;
        myArrayOf2$ = of(...listaDirectivosBeneficiarios);

        myArrayOf2$
          .pipe(
            map(data => {
              data.directivo = Number(data.directivo);
              this.listaDirectivosBeneficiarios.push(data);
            })
          )
          .subscribe();
        // console.log(this.listaDirectivosBeneficiarios);

        let sumas = 0;
        let sumaBeneficiarios = 0;

        this.listaSociosPagaron.forEach((element: any) => {
          sumas = sumas + Number(element.total_pagado);
        });

        this.sumaTotal = sumas;
        this.listaDirectivosBeneficiarios.forEach((element: any) => {
          sumaBeneficiarios = sumaBeneficiarios + Number(element.total_pagado);
        });
        this.sumaTotalBeneficiario = sumaBeneficiarios;

        if (this.sumaTotal === 0 || this.sumaTotalBeneficiario === 0) {
          this.cargando = false;
          this.mostrar = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este reporte no existe!',
            footer: 'Vuelva a intentarlo..'
          })
        } else {
          this.toastr.success('Reporte encontrado con exito!', 'Sistema de reportes');
          this.cargando = false;
          this.mostrar = true;
        }
      }, err => {
        console.log(err);
      })

  }
  /**
 * crearPDF
 */
  public crearPDF() {

  }

}
