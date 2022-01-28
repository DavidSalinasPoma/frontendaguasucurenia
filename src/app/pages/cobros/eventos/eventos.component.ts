import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventosService } from './../../../services/eventos.service';
import { Eventos } from 'src/app/models/eventos.models';

// Variables globales
const base_url = environment.base_url;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public totalUsuarios2: number = 0;

  public eventos: Eventos[] = [];
  public eventos2: Eventos[] = [];

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
    private eventosServices: EventosService
  ) { }

  ngOnInit(): void {

    const cambioRuta = Number(localStorage.getItem('guardarRuta'));
    localStorage.removeItem('guardarRuta');

    if (cambioRuta) {
      this.eliminarLocalstorage();
      this.persistenciaPagina();
    } else {
      const nameBuscar = localStorage.getItem('usuario');
      // console.log(nameBuscar);
      if (nameBuscar) {
        (document.getElementById('textBuscar') as HTMLInputElement).value = nameBuscar;
        const urlBuscar = String(localStorage.getItem('urlPagination'));
        this.buscarEventos(nameBuscar, urlBuscar)

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
      this.cargarEvento(`${base_url}/api/evento?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarEvento(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarEventos(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarEvento(urlParams)


    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/eventos?page=1`

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

        this.eventosServices.buscarEventos(formDatos)
          .subscribe(({ evento }) => {

            this.totalUsuarios2 = evento.total;
            this.eventos2 = evento.data;

            this.paginaSiguiente2 = evento.next_page_url;
            this.paginaAnterior2 = evento.prev_page_url;

            this.cantPaginas2 = evento.last_page;
            this.currentPage2 = evento.current_page;

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
  public cargarEvento(params: string) {

    // Loading
    this.cargando = true;

    this.eventosServices.cargarEventos(params)
      .subscribe(({ evento }) => {

        // console.log(evento);
        this.totalUsuarios = evento.total;

        this.eventos = evento.data;

        this.setPaginator(evento);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/evento?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/evento?page=${this.currentPage}`)

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
  public eliminarEvento(evento: Eventos, bandera: number): any {


    let id: number;
    let nombre: string;

    if (bandera) {
      id = Number(evento.id);
      nombre = evento.evento;
    } else {
      nombre = String(evento.evento);
      id = Number(evento.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar el evento ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.eventosServices.eliminarEvento(id)
          .subscribe(resp => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarEvento(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarEventos(nameEvento, urlUser);
            }

            // Eliminar el producto de la BD
            const formData = {
              nombre: 'evento',
            }
            this.eventosServices.eliminarProducto(formData, id)
              .subscribe(({ message }) => {
                Swal.fire(
                  'Evento dado de Baja!',
                  `${message}`,
                  'success'
                )
              })
          }, (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El evento ya fue dado de baja!',
            })
          }
          );

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