import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Sericios
import { Socios } from 'src/app/models/socios.models';
import { SociosService } from 'src/app/services/socios.service';
import { ListasService } from 'src/app/services/listas.service';
import { Listas } from 'src/app/models/listas.models';

// Variables globales
const base_url = environment.base_url;




@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

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

  constructor(
    private socioServices: SociosService,
    private listaServices: ListasService
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
        this.buscarSocios(nameBuscar, urlBuscar)
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
      this.cargarSocio(`${base_url}/api/lista?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarSocio(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarSocios(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarSocio(urlParams)


    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/listas?page=1`

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

        this.listaServices.buscarSocios(formDatos)
          .subscribe(({ socio, sLectura, cLectura }) => {


            this.totalSocios2 = socio.total;
            this.sLectura2 = sLectura.sLectura;
            this.cLectura2 = cLectura.cLectura;


            this.socios2 = socio.data;
            this.options = [];
            // console.log(this.socios);
            this.socios2.forEach((element: any) => {
              if (element.estado === 1 || element.estado === '1') {
                this.options.push(element);
              }
            });

            this.paginaSiguiente2 = socio.next_page_url;
            this.paginaAnterior2 = socio.prev_page_url;

            this.cantPaginas2 = socio.last_page;
            this.currentPage2 = socio.current_page;

            // Persistencia de pagina
            localStorage.setItem('urlPagination', `${base_url}/api/buscar/listas?page=${this.currentPage2}`);

            // loading
            this.cargando = false;
          })


      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarSocio(params: string) {

    // Loading
    this.cargando = true;

    this.listaServices.cargarSocios(params)
      .subscribe(({ socio, sLectura, cLectura }) => {

        // console.log(socio);


        this.totalSocios = socio.total;
        this.sLectura = sLectura;
        this.cLectura = cLectura;

        this.socios = socio.data;

        this.options = [];
        // console.log(this.socios);
        this.socios.forEach((element: any) => {
          if (element.estado === 1 || element.estado === '1') {
            this.options.push(element);
          }
        });

        this.setPaginator(socio);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/lista?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/lista?page=${this.currentPage}`)

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
  public eliminarSocio(socio: Socios, bandera: number): any {

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
              this.cargarSocio(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarSocios(nameEvento, urlUser);
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


}

