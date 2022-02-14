import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios
import { Socios } from 'src/app/models/socios.models';
import { SociosService } from 'src/app/services/socios.service';
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

  public options: any = [];

  public total: number = 0;

  // Formularios
  public formulario!: FormGroup;

  public socioText: any;

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

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
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
        textos: this.textoBuscar,
        url: urls
      }

      if (this.textoBuscar) {
        this.mostrar = false;
        this.cargando = true;

        this.facturaServices.buscarFacturas(formDatos)
          .subscribe(({ factura }) => {
            // console.log(factura);
            this.socios2 = factura.data;
            this.total = 0;

            if (this.socios2.length != 0) {
              // console.log(this.socios2);
              // this.total = factura.total;

              this.options = [];
              // console.log(this.socios);
              this.socios2.forEach((element: any) => {
                if (element.estado_pago === 0 || element.estado_pago === '0') {
                  this.options.push(element);
                  this.total = this.total + 1;
                }
              });

              // console.log(this.options);

              this.paginaSiguiente2 = factura.next_page_url;
              this.paginaAnterior2 = factura.prev_page_url;
              this.cantPaginas2 = factura.last_page;
              this.currentPage2 = factura.current_page;

              // Persistencia de pagina
              localStorage.setItem('urlPagination', `${base_url}/api/ubicar/facturas?page=${this.currentPage2}`);

              if (this.options.length === 0) {
                Swal.fire({
                  icon: 'info',
                  title: 'Facturas',
                  text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
                })
              }
              // loading
              this.cargando = false;
            } else {
              // loading
              this.options = [];
              this.total = 0;
              this.cargando = false;

              Swal.fire({
                icon: 'info',
                title: 'La factura no exite!',
                text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
              })
              localStorage.removeItem('usuario');
              const url: any = localStorage.getItem('paramsUrl');
              this.cargarFacturas(url);
              // localStorage.setItem('urlPagination', `${base_url}/api/buscar/facturas?page=1`);
              this.mostrar = true;
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
    this.cargando = true;

    this.facturaServices.cargarFacturas(params)
      .subscribe(({ factura }) => {

        this.socios = factura.data;
        // console.log(this.socios);

        this.options = [];

        this.setPaginator(factura);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/factura?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/factura?page=${this.currentPage}`)

        // loading
        this.cargando = false;

      })
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
}
