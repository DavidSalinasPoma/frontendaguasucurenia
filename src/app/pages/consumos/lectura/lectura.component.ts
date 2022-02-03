import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoService } from 'src/app/services/consumo.service';
import { FacturaService } from 'src/app/services/factura.service';
import { LecturaService } from 'src/app/services/lectura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})
export class LecturaComponent implements OnInit {
  // Formularios
  public formulario!: FormGroup;
  // loading
  public cargando: boolean = true;
  public idSocio: number;

  public socioDatos: any;

  public mes: any;
  public anio: any;
  public fecha: any;

  public datosConsumo: any;
  public lectAnterior: any = 0;
  public lectActual: any;
  public consumo: any;
  public total: any;

  public mostraAnterior: boolean = false;
  public mostraActual: boolean = false;

  public options: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private lecturaServices: LecturaService,
    private rutaActiva: ActivatedRoute,
    private consumoServices: ConsumoService,
    private router: Router,
    private facturaServices: FacturaService

  ) {
    // Recibiendo el parametro
    this.idSocio = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.cargando = true;
    this.crearFormulario();
    this.showLecturas();
    this.cargando = false;

  }
  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      lectura: ['', [Validators.required]],
      anterior: [''],
    });
  }

  // Validaciones para formulario
  get lectura() {
    return this.formulario.get('lectura');
  }

  /**
  * ngSubmit
  */
  public onSubmit(event: any) {
    let mesFormat = '';
    let anioFormat = 0;

    let fecha = new Date(this.socioDatos[0].mes);

    anioFormat = fecha.getFullYear();

    switch (Number(fecha.getMonth())) {
      case 0:
        mesFormat = 'enero';
        break;
      case 1:
        mesFormat = 'febrero';
        break;
      case 2:
        mesFormat = 'marzo';
        break;
      case 3:
        mesFormat = 'abril';
        break;
      case 4:
        mesFormat = 'mayo';
        break;
      case 5:
        mesFormat = 'junio';
        break;
      case 6:
        mesFormat = 'julio';
        break;
      case 7:
        mesFormat = 'agosto';
        break;
      case 8:
        mesFormat = 'septiembre';
        break;
      case 9:
        mesFormat = 'octubre';
        break;
      case 10:
        mesFormat = 'noviembre';
        break;
      case 11:
        mesFormat = 'diciembre';
        break;

      default:
        mesFormat = 'No existe';
        break;
    }



    const formData = {
      lecturaAnterior: this.lectAnterior,
      lecturaActual: this.lectActual,
      consumo: this.consumo,
      precio: this.total,
      mes: mesFormat,
      anio: anioFormat,
      socio_id: this.socioDatos[0].id,
      apertura_id: this.socioDatos[0].apertura,
      lista_id: this.socioDatos[0].lista
    }
    // console.log(formData);

    this.consumoServices.storeConsumos(formData)
      .subscribe(({ consumo }) => {
        // console.log(consumo);
        this.router.navigateByUrl('/dashboard/consumos');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Correcto!',
          text: `El Consumo fue creado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })

        const datosForm = {
          consumo_id: consumo.id
        }
        // Aqui La logica de generar factura
        this.facturaServices.crearFactura(datosForm)
          .subscribe(() => { });


      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
      });

  }

  /**
   * showLecturas
   */
  public async showLecturas() {

    const { socio } = await this.lecturaServices.showLecturas(this.idSocio).toPromise();

    this.socioDatos = socio.data;
    // console.log(this.socioDatos);


    this.fecha = this.socioDatos[0].mes;
    let e = new Date(this.socioDatos[0].mes);
    // console.log(e);

    const fecha = e.setMonth(e.getMonth() - 1);

    let a = new Date(fecha)

    const periodo = Number(a.getMonth());

    switch (periodo) {
      case 0:
        this.mes = 'enero';
        break;
      case 1:
        this.mes = 'febrero';
        break;
      case 2:
        this.mes = 'marzo';
        break;
      case 3:
        this.mes = 'abril';
        break;
      case 4:
        this.mes = 'mayo';
        break;
      case 5:
        this.mes = 'junio';
        break;
      case 6:
        this.mes = 'julio';
        break;
      case 7:
        this.mes = 'agosto';
        break;
      case 8:
        this.mes = 'septiembre';
        break;
      case 9:
        this.mes = 'octubre';
        break;
      case 10:
        this.mes = 'noviembre';
        break;
      case 11:
        this.mes = 'diciembre';
        break;

      default:
        this.mes = 'No existe';
        break;
    }
    this.anio = a.getFullYear();

    await this.showConsumo();

  }

  public showConsumo() {

    const formData = {
      id: this.idSocio,
      mes: this.mes,
      anio: this.anio,
    }

    // console.log(formData);

    this.lecturaServices.showConsumos(formData)
      .subscribe(({ socio }) => {
        if (socio.data[0] != undefined) {
          this.datosConsumo = socio.data[0];
          this.lectAnterior = Number(this.datosConsumo.lecturaActual);
          this.mostraAnterior = false;
          this.mostraActual = true;
        } else {
          this.mostraAnterior = true;
          this.mostraActual = false;
        }
      })
  }


  /**
   * cuboAnterior
   */
  public cuboAnterior(cubos: any) {
    if (cubos === '') {
      this.consumo = 0;
      this.total = 0;
      this.lectActual = 0;
      this.lectAnterior = 0;
      this.formulario.reset();
    } else {
      this.lectAnterior = cubos;
    }
  }


  /**
   * cuboPrecio
   */
  public cuboPrecio(cubos: any) {

    if (cubos === '') {
      this.consumo = 0;
      this.total = 0;
      this.lectActual = 0;
    } else {


      this.lectActual = cubos;
      // console.log(this.lectActual);

      this.consumo = cubos - this.lectAnterior;


      // console.log(this.consumo);

      if (this.consumo < 1) {
        this.consumo = 0;
        this.lectActual = 0;
      }
      if (this.consumo > 136) {
        Swal.fire({
          icon: 'error',
          title: 'Datos incorrectos!',
          text: `El consumo de: ${this.consumo} m3. No tiene un precio establecido.`,
        })
        this.consumo = 0;
        this.lectActual = 0;
        this.formulario.reset();
      }

      const formData = {
        cubos: this.consumo
      }

      this.lecturaServices.cuboPrecio(formData)
        .subscribe((precio) => {
          this.total = precio.precio;
        });


    }

  }


  /**
   * subirAnterior
   */
  public subirAnterior() {

    if (this.lectAnterior === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Lectura de consumo anterior no tiene datos',
      })
    } else {
      this.mostraAnterior = false;
      this.mostraActual = true;
    }

  }


}
