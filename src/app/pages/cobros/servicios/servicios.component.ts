import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventosService } from './../../../services/eventos.service';
import { Eventos } from 'src/app/models/eventos.models';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicios } from 'src/app/models/servicios.models';

// Variables globales
const base_url = environment.base_url;


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public totalServicios: number = 0;
  public totalServicios2: number = 0;

  public servicios: Servicios[] = [];
  public servicios2: Servicios[] = [];

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

  constructor(
    private eventosServices: EventosService,
    private serciciosServices: ServiciosService
  ) { }

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
        this.buscarServicios(nameBuscar, urlBuscar)
      } else {
        this.persistenciaPagina();
      }
    }

  }

  /**
   * persistenciaPagina
   */
  public persistenciaPagina() {
    this.primeraPagina = localStorage.getItem('urlPagination')
    // console.log(this.primeraPagina);

    if (this.primeraPagina === null) {
      this.cargarServicio(`${base_url}/api/servicio?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarServicio(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarServicios(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarServicio(urlParams)


    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/servicios?page=1`

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

        this.serciciosServices.buscarServicios(formDatos)
          .subscribe(({ servicio }) => {

            this.totalServicios2 = servicio.total;
            this.servicios2 = servicio.data;

            this.paginaSiguiente2 = servicio.next_page_url;
            this.paginaAnterior2 = servicio.prev_page_url;

            this.cantPaginas2 = servicio.last_page;
            this.currentPage2 = servicio.current_page;

            // Persistencia de pagina
            localStorage.setItem('urlPagination', `${base_url}/api/buscar/eventos?page=${this.currentPage2}`);

            // loading
            this.cargando = false;
          })


      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarServicio(params: string) {

    // Loading
    this.cargando = true;

    this.serciciosServices.cargarServicios(params)
      .subscribe(({ servicio }) => {

        // console.log(servicio);
        this.totalServicios = servicio.total;

        this.servicios = servicio.data;

        this.setPaginator(servicio);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/servicio?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/servicio?page=${this.currentPage}`)

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
  public eliminarServicio(servicio: Servicios, bandera: number): any {


    let id: number;
    let nombre: string;

    if (bandera) {
      id = Number(servicio.id);
      nombre = servicio.nombre;
    } else {
      nombre = String(servicio.nombre);
      id = Number(servicio.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar el servicio ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'

    }).then((result) => {
      if (result.isConfirmed) {

        this.serciciosServices.eliminarServicio(id)
          .subscribe(() => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarServicio(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarServicios(nameEvento, urlUser);
            }
            // Eliminar el producto de la BD
            const formData = {
              nombre: 'servicio',
            }
            this.eventosServices.eliminarProducto(formData, id)
              .subscribe(({ message }) => {
                Swal.fire(
                  'Servicio dado de Baja!',
                  `${message}`,
                  'success'
                )
              })
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


}
