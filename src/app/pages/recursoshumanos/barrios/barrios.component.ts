import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios

import { Barrios } from 'src/app/models/barrio.models';
import { BarriosService } from 'src/app/services/barrios.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Variables globales
const base_url = environment.base_url;


@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styleUrls: ['./barrios.component.css']
})
export class BarriosComponent implements OnInit {

  public totalBarrios: number = 0;
  public totalBarrios2: number = 0;

  public barrios: Barrios[] = [];
  public barrios2: Barrios[] = [];

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
    private barrioServices: BarriosService
  ) { }

  ngOnInit(): void {


    const cambioRuta = Number(localStorage.getItem('guardarRuta'));
    localStorage.removeItem('guardarRuta');

    if (cambioRuta) {
      this.eliminarLocalstorage();
      this.persistenciaPagina();
    } else {
      const nameBuscar = localStorage.getItem('usuario');
      if (nameBuscar) {
        (document.getElementById('textBuscar') as HTMLInputElement).value = nameBuscar;
        const urlBuscar = String(localStorage.getItem('urlPagination'));
        this.buscarBarrios(nameBuscar, urlBuscar)
        // console.log('hola');

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
      this.cargarBarrios(`${base_url}/api/barrio?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarBarrios(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarBarrios(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarBarrios(urlParams)


    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/barrios?page=1`

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

        this.barrioServices.buscarBarrios(formDatos)
          .subscribe(({ barrio }) => {

            this.totalBarrios2 = barrio.total;

            let myArrayOf$: Observable<any>;

            myArrayOf$ = of(barrio.data);

            myArrayOf$.pipe(map((data, index) => {
              data[index].estado = Number(data[index].estado);
              return data;
            }))
              .subscribe(resp => {
                this.barrios2 = resp;
              })

            this.paginaSiguiente2 = barrio.next_page_url;
            this.paginaAnterior2 = barrio.prev_page_url;

            this.cantPaginas2 = barrio.last_page;
            this.currentPage2 = barrio.current_page;

            // Persistencia de pagina
            localStorage.setItem('urlPagination', `${base_url}/api/buscar/barrios?page=${this.currentPage2}`);

            // loading
            this.cargando = false;
          })


      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarBarrios(params: string) {

    // Loading
    this.cargando = true;

    this.barrioServices.cargarBarrios(params)
      .subscribe(({ barrio }) => {

        // console.log(barrio);
        this.totalBarrios = barrio.total;

        // this.barrios = barrio.data;


        let myArrayOf$: Observable<any>;

        myArrayOf$ = of(barrio.data);

        myArrayOf$.pipe(map((data, index) => {
          data[index].estado = Number(data[index].estado);
          return data;
        }))
          .subscribe(resp => {
            this.barrios = resp;
          })



        this.setPaginator(barrio);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/barrio?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/barrio?page=${this.currentPage}`);
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
  public eliminarBarrio(barrio: Barrios, bandera: number): any {


    let id: number;
    let nombre: string;

    if (bandera) {
      id = Number(barrio.id);
      nombre = barrio.nombre;
    } else {
      nombre = String(barrio.nombre);
      id = Number(barrio.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar el barrio ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.barrioServices.eliminarBarrio(id)
          .subscribe(() => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarBarrios(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarBarrios(nameEvento, urlUser);
            }

            Swal.fire(
              'Barrio dado de Baja!',
              `El barrio ${nombre} fue dado de baja correctamente`,
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


}
