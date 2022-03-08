import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { Validacionespropias } from 'src/app/utils/validacionespropias';
import { ConsumoService } from 'src/app/services/consumo.service';
import { FacturaService } from 'src/app/services/factura.service';
import { LecturaService } from 'src/app/services/lectura.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SociosService } from 'src/app/services/socios.service';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})
export class LecturaComponent implements OnInit, OnDestroy {
  // Formularios
  public formulario!: FormGroup;
  public formularioAnterior!: FormGroup;
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

  // Validar lectura que sea mayor al anterior
  public mostrarError: boolean = false;

  // Mejorar el performance de la busqueda
  private OnDestroy$ = new Subject();
  public searchTerm$ = new Subject<string>();

  // Ocultar boton al guardar
  public ocultar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private lecturaServices: LecturaService,
    private rutaActiva: ActivatedRoute,
    private consumoServices: ConsumoService,
    private router: Router,
    private facturaServices: FacturaService,
    private toastr: ToastrService,
    private socioServices: SociosService

  ) {
    // Recibiendo el parametro
    this.idSocio = this.rutaActiva.snapshot.params.id;
  }
  ngOnDestroy(): void {
    // Para que se deatruya despues de salir de esta vista
    this.OnDestroy$.next();
  }

  ngOnInit(): void {

    this.crearFormulario();
    this.showLecturas();
    this.cuboPrecio('');
  }
  /**
   * formulario
   */
  public crearFormulario() {

    this.formularioAnterior = this.formBuilder.group({
      anterior: ['', [Validators.required]]
    });

    this.formulario = this.formBuilder.group({
      lectura: ['', [Validators.required]],
    });
  }

  // Validaciones para formulario
  get lectura() {
    return this.formulario.get('lectura');
  }
  // Validaciones para formulario
  get anterior() {
    return this.formularioAnterior.get('anterior');
  }


  /**
   * onSubmitAnterior
event:any   */
  public onSubmitAnterior(event: any) {

    this.mostraAnterior = false;
    this.mostraActual = true;
  }


  /**
  * ngSubmit
  */
  public onSubmit(event: any) {


    this.ocultar = false;

    // Deshabilitando un boton
    // console.log('holas');

    this.lectActual = this.lectura?.value;
    this.formulario.reset();

    if (Number(this.lectAnterior) > Number(this.lectActual)) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `La lectura actual no puede ser menor a la lectura anterior`,
      })
    } else {

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
        lista_id: this.socioDatos[0].lista,
        directivo: this.socioDatos[0].directivoLista
      }

      console.log(formData);
      // return;

      this.consumoServices.storeConsumos(formData)
        .subscribe(({ consumo }) => {
          // console.log(consumo);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Registro Correcto!',
            text: `El Consumo fue creado correctamente!`,
            showConfirmButton: false,
            timer: 3000
          })

          this.router.navigateByUrl('/dashboard/consumos');
          // this.toastr.success('El consumo fue creado Correctamente!', 'Registro Correcto!');
          this.ocultar = true;

          const datosForm = {
            consumo_id: consumo.id
          }

          // Logica para generar factura para directivos
          // console.log(formData);
          this.socioServices.showSocios(formData.socio_id)
            .subscribe(({ socio }) => {
              // console.log(socio);
            })
          // return;
          // Aqui La logica de generar factura
          this.facturaServices.crearFactura(datosForm)
            .subscribe(() => { });


        }, (err) => {
          console.log(err);

          Swal.fire('Error', err.error.message, 'error')
        });

    }
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

    this.cargando = false;

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
    // console.log(cubos);
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
  public cuboPrecio(text?: any) {

    if (text != '') {
      this.logicaBuscar(text)
    } else {
      this.searchTerm$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.OnDestroy$)
      )
        .subscribe(texto => {

          if (Number(this.lectAnterior) > Number(texto)) {
            this.mostrarError = true;
          } else {
            this.mostrarError = false;
            this.logicaBuscar(texto)
          }
        })
    }

  }


  public logicaBuscar(cubos?: any) {
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
          // console.log(precio);
          this.total = precio.precio;
        });
    }

  }
}
