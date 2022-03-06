import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios
import { Socios } from 'src/app/models/socios.models';
import { ListasService } from 'src/app/services/listas.service';
import { Listas } from 'src/app/models/listas.models';
import { FacturaService } from 'src/app/services/factura.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


// Variables globales
const base_url = environment.base_url;



@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  public totalSocios: number = 0;
  public totalSocios2: number = 0;

  public sLectura: number = 0;
  public sLectura2: number = 0;
  public cLectura: number = 0;
  public cLectura2: number = 0;

  public socios: Listas[] = [];
  public socios2: Listas[] = [];

  public pagination: any;


  // Persistencia de datos
  public primeraPagina: any;
  public primeraPaginaUsuario: any;



  // Pagina siguiente y anterios
  public paginaSiguiente: any;
  public paginaAnterior: any;

  public paginaSiguiente2: any;
  public paginaAnterior2: any;


  // Cantidad de paginas
  public currentPage: number = 1;
  public cantPaginas: number = 1;

  public currentPage2: number = 1;
  public cantPaginas2: number = 1;

  // loading
  public cargando: boolean = true;

  // Para realizar busquedas en el servidor
  public textoBuscar: any = '';

  // Mostra 
  public mostrar: boolean = true;
  public mostrar1: boolean = false;

  public options: any = [];

  public total: number = 0;
  public totalSaldo: number = 0;

  // Formularios
  public formulario!: FormGroup;

  public socioText: any;

  public socio: any;
  public detalle: any;

  public finalOptions: any;

  // Para manipular el dom
  // Para manipular el dom

  @ViewChild('text') demoDom!: ElementRef;

  constructor(
    private listaServices: ListasService,
    private facturaServices: FacturaService,
    private formBuilder: FormBuilder,
    private dataServices: DataService,
    private renderer: Renderer2

  ) {

    this.promesas();

  }



  ngOnInit(): void {

    const cambioRuta = Number(localStorage.getItem('guardarRuta'));
    localStorage.removeItem('guardarRuta');


    if (cambioRuta) {
      this.eliminarLocalstorage();
      this.persistenciaPagina();
    } else {
      // console.log(this.textoBuscar);
      const nameBuscar = localStorage.getItem('usuario');
      // console.log(nameBuscar);

      if (nameBuscar) {
        (document.getElementById('textBuscar') as HTMLInputElement).value = nameBuscar;
        const urlBuscar = String(localStorage.getItem('urlPagination'));
        this.buscarFacturas(nameBuscar, urlBuscar)
      } else {
        this.persistenciaPagina();
      }
    }



  }

  /**
   * promesas
   */
  async promesas() {

    this.crearFormulario();

    const result = await this.evento()

    const result2 = await this.cargarInput(result);

    // console.log(result2);


  }

  /**
   * cargarInput
   */
  public cargarInput(dato: any) {
    return new Promise((resolve, reject) => {
      resolve(
        this.formulario.patchValue({
          buscar: dato
        })
      );
    });
  }

  /**
   * promesa
   */
  public evento() {
    return new Promise((resolve, reject) => {
      this.dataServices.idSocio$.subscribe(resp => {
        resolve(resp);
      })
    });
  }


  public crearFormulario() {
    // console.log('hola');

    this.formulario = this.formBuilder.group({
      buscar: ['']
    });
  }

  // Validaciones para formulario
  get buscar() {
    return this.formulario.get('buscar');
  }

  /**
   * persistenciaPagina
   */
  public persistenciaPagina() {
    this.primeraPagina = localStorage.getItem('urlPagination')
    // console.log(this.primeraPagina);

    if (this.primeraPagina === null) {
      this.cargarFacturas(`${base_url}/api/factura?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarFacturas(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarFacturas(texto: any, url?: string, band?: number) {
    // console.log(texto);


    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));

      this.cargarFacturas(urlParams)

    } else {



      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/ubicar/facturas?page=1`

      }
      if (url != '') {
        urls = url;
        // console.log(url);

      }

      const formDatos = {
        textos: Number(this.textoBuscar),
        url: urls
      }

      if (this.textoBuscar) {

        // console.log(formDatos);
        this.cargando = true;

        this.facturaServices.buscarFacturas(formDatos)
          .subscribe(({ factura }) => {

            this.socios2 = factura.data;
            this.total = 0;

            let count = 0;

            if (this.socios2.length != 0) {
              // console.log(this.socios2);

              this.options = [];
              // console.log(this.socios);
              this.socios2.forEach((element: any, index) => {
                if (element.estado_pago === 0 || element.estado_pago === '0') {
                  this.options.push(element);
                  this.total = this.total + 1;
                  // console.log(this.options);
                  // console.log(index);
                  this.totalDetalle(Number(element.idFactura), count);
                  count++;
                }
              });



              this.paginaSiguiente2 = factura.next_page_url;
              this.paginaAnterior2 = factura.prev_page_url;
              this.cantPaginas2 = factura.last_page;
              this.currentPage2 = factura.current_page;

              // Persistencia de pagina
              localStorage.setItem('urlPagination', `${base_url}/api/ubicar/facturas?page=${this.currentPage2}`);

              if (this.options.length === 0) {
                this.cargando = false;
                Swal.fire({
                  icon: 'info',
                  title: 'Facturas',
                  text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
                })
              }

            } else {
              // loading
              this.options = [];
              this.total = 0;
              Swal.fire({
                icon: 'info',
                title: 'La factura no exite!',
                text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
              })
              localStorage.removeItem('usuario');
              const url: any = localStorage.getItem('paramsUrl');
              this.cargarFacturas(url);
              // localStorage.setItem('urlPagination', `${base_url}/api/buscar/facturas?page=1`);

            }
          })
      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarFacturas(params: string) {

    // Loading
    this.cargando = false;

  }

  /**
   * setPaginator
   */
  public setPaginator(data: any) {
    const pagination = {
      "current_page": data.current_page,
      "last_page": data.last_page,
      "next_page_url": data.next_page_url,
      "path": data.path,
      "per_page": data.per_page,
      "prev_page_url": data.prev_page_url,
      "to": data.to,
      "total": data.total
    }
    this.pagination = pagination;
  }



  // Darde baja al los usuarios
  /**
   * Eliminar
   */
  public eliminarFacturas(socio: Socios, bandera: number): any {

    let id: number;
    let nombre: string;

    if (bandera) {
      id = Number(socio.id);
      nombre = socio.persona.nombres;
    } else {
      nombre = String(socio.nombres);
      id = Number(socio.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar al socio ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.listaServices.eliminarSocio(id)
          .subscribe(() => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarFacturas(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarFacturas(nameEvento, urlUser);
            }

            Swal.fire(
              'Servicio dado de Baja!',
              `El socio ${nombre} fue dado de baja correctamente`,
              'success'
            )

          });

      }
    })


  }

  /**
   * eliminarLocalstorage
   */
  public eliminarLocalstorage() {
    localStorage.removeItem('urlPagination');
    localStorage.removeItem('paramsUrl');
  }

  /**
   * limpiar
   */
  public limpiar() {
    this.options = [];
    this.total = 0;
    this.formulario.reset();
  }

  /**
  * totalDetalle
  */
  public totalDetalle(item: number, index: number) {
    // console.log(item, ' ', index);

    this.facturaServices.showFacturas(item)
      .subscribe(({ detalle }) => {
        let suma = 0;
        // console.log(detalle);
        if (detalle.length != 0) {
          this.socio = detalle[0];
          this.detalle = detalle;
          // console.log(detalle);
          detalle.forEach((element: any) => {
            suma = suma + Number(element.precioDetalle)
          });

          this.totalSaldo = suma + Number(this.socio.retraso) + Number(this.socio.precioConsumo);
          // console.log(this.totalSaldo);

          const formData = {
            saldo: Number(this.totalSaldo)
          }
          // console.log(this.options);

          // return;
          this.finalOptions = Object.assign(this.options[index], formData);
          this.cargando = false;
        } else {
          this.facturaServices.retrasoFactura(item)
            .subscribe(({ factura }) => {
              // console.log(factura);
              this.socio = factura[0];
              this.totalSaldo = Number(this.socio.retraso) + Number(this.socio.precioConsumo);
              const formData = {
                saldo: this.totalSaldo
              }
              this.finalOptions = Object.assign(this.options[index], formData);
              this.cargando = false;
            })
        }

      });
  }
}
