import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastrService } from 'ngx-toastr';


interface Mes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cobroxmes',
  templateUrl: './cobroxmes.component.html',
  styleUrls: ['./cobroxmes.component.css']
})
export class CobroxmesComponent implements OnInit {

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

  public totaConsumo: number = 0;
  public totaConsumoString: any;
  public totalMes: number = 0;
  public totalConvertidoMes: any;
  public totalDirectivos: number = 0;
  public totalRetrazo: number = 0;
  public totalAgrupados: any;

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
    this.reporteServices.cobrosxMes(this.formulario.value)
      .subscribe(({ sumaSoloConsumoTotal, facturaTotalMes, facturaTotalDirectivos, facturaTotalRetrasos, agrupados }) => {


        this.totalDirectivos = facturaTotalDirectivos[0]?.sumaFacturasDirectivos_total || 0;
        this.totaConsumo = Number(sumaSoloConsumoTotal) + Number(this.totalDirectivos);

        this.totaConsumoString = Number(this.totaConsumo).toLocaleString('en-US');

        this.totalRetrazo = facturaTotalRetrasos[0]?.sumaFacturasRetrasos_total || 0;

        this.totalAgrupados = agrupados;

        this.totalMes = (facturaTotalMes[0]?.sumaFacturas_total || 0) - Number(this.totalDirectivos);

        this.totalConvertidoMes = Number(this.totalMes).toLocaleString('en-US');




        if (this.totalMes === 0) {
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
