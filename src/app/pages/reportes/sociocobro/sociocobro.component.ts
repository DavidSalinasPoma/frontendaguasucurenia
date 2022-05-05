import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastrService } from 'ngx-toastr';


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

  public listaSociosPagaron: any;

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
          // CobroSocioporMes
          listaSociosPagaron
        }) => {

        console.log(listaSociosPagaron);
        this.listaSociosPagaron = listaSociosPagaron

        //   if (this.totalMes === 0) {
        //     this.cargando = false;
        //     this.mostrar = false;
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Oops...',
        //       text: 'Este reporte no existe!',
        //       footer: 'Vuelva a intentarlo..'
        //     })
        //   } else {
        //     this.toastr.success('Reporte encontrado con exito!', 'Sistema de reportes');
        this.cargando = false;
        this.mostrar = true;
        //   }
        // }, err => {
        //   console.log(err);
      })

  }
  /**
 * crearPDF
 */
  public crearPDF() {

  }

}
