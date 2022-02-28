import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Servicios
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';

// RxJS
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// Variables globales
const base_url = environment.base_url;



@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  public totalPersonas: number = 0;
  public totalPersonas2: number = 0;

  public personas: Persona[] = [];
  public personas2: Persona[] = [];

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
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {

    // Mejora la performace del boton buscar
    const search = document.getElementById('textBusca');
    console.log(search);

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
        this.buscarPersonas(nameBuscar, urlBuscar)
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
      this.cargarPersonas(`${base_url}/api/persona?page=1`);
      // console.log('hola');

    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarPersonas(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public buscarPersonas(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarPersonas(urlParams)

    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/personas?page=1`

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


        this.personaService.buscarPersonas(formDatos)
          .subscribe(({ persona }) => {

            this.totalPersonas2 = persona.total;
            // Implementando logica de rxjs
            let myArrayOf$: Observable<any>;

            myArrayOf$ = of(persona.data);

            myArrayOf$.pipe(map((data, index) => {
              data[index].estado = Number(data[index].estado);
              return data;
            }))
              .subscribe(resp => {
                this.personas2 = resp;
              })

            this.paginaSiguiente2 = persona.next_page_url;
            this.paginaAnterior2 = persona.prev_page_url;

            this.cantPaginas2 = persona.last_page;
            this.currentPage2 = persona.current_page;

            // Persistencia de pagina
            localStorage.setItem('urlPagination', `${base_url}/api/buscar/personas?page=${this.currentPage2}`);

            // loading
            this.cargando = false;
          })


      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarPersonas(params: string) {

    // Loading
    this.cargando = true;

    this.personaService.cargarPersonas(params)
      .subscribe(({ persona }) => {

        // console.log(barrio);
        this.totalPersonas = persona.total;

        // Implementando logica de rxjs
        let myArrayOf$: Observable<any>;

        myArrayOf$ = of(persona.data);

        myArrayOf$.pipe(map((data, index) => {
          data[index].estado = Number(data[index].estado);
          return data;
        }))
          .subscribe(resp => {
            this.personas = resp;
          })


        this.setPaginator(persona);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/persona?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/persona?page=${this.currentPage}`);
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
  public eliminarPersona(persona: Persona, bandera: number): any {


    let id: number;
    let nombre: string;

    if (bandera) {
      id = Number(persona.id);
      nombre = persona.nombres;
    } else {
      nombre = String(persona.nombres);
      id = Number(persona.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar a ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.personaService.eliminarPersona(id)
          .subscribe(() => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarPersonas(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameEvento = localStorage.getItem('usuario');
              this.buscarPersonas(nameEvento, urlUser);
            }

            Swal.fire(
              'Persona dado de Baja!',
              `La ${nombre} fue dado de baja correctamente`,
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