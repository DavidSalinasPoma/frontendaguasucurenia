import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


// Variables globales
const base_url = environment.base_url;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public totalUsuarios2: number = 0;

  public usuarios: Usuario[] = [];
  public usuarios2: Usuario[] = [];

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

  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit(): void {

    // console.log(this.textoBuscar);
    const nameBuscar = localStorage.getItem('usuario');
    // console.log(nameBuscar);

    if (nameBuscar) {
      (document.getElementById('textBuscar') as HTMLInputElement).value = nameBuscar;
      const urlBuscar = String(localStorage.getItem('urlPagination'));
      this.cargarUsuarioBuscar(nameBuscar, urlBuscar)

    } else {
      this.persistenciaPagina();

    }
  }

  /**
   * persistenciaPagina
   */
  public persistenciaPagina() {
    this.primeraPagina = localStorage.getItem('urlPagination')
    // console.log(this.primeraPagina);

    if (this.primeraPagina === null) {
      this.cargarUsuario(`${base_url}/api/user?page=1`);
    } else {
      this.primeraPagina = localStorage.getItem('urlPagination')
      this.cargarUsuario(this.primeraPagina);
    }
  }

  /**
   * cargarUsuarioBuscar
   */
  public cargarUsuarioBuscar(texto: any, url?: string, band?: number) {

    if (band) {
      localStorage.setItem('usuario', texto);
    }

    if (texto === '' && url === '') {
      const urlParams = String(localStorage.getItem('paramsUrl'));
      this.mostrar = true;
      this.cargarUsuario(urlParams)


    } else {

      let urls;

      if (texto != '' || this.textoBuscar === '') {

        this.textoBuscar = texto
        urls = `${base_url}/api/buscar/usuario?page=1`

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

        this.usuarioServices.cargarUsuariosBuscar(formDatos)
          .subscribe(({ user }) => {

            this.totalUsuarios2 = user.total;
            this.usuarios2 = user.data;

            this.paginaSiguiente2 = user.next_page_url;
            this.paginaAnterior2 = user.prev_page_url;

            this.cantPaginas2 = user.last_page;
            this.currentPage2 = user.current_page;

            // Persistencia de pagina
            localStorage.setItem('urlPagination', `${base_url}/api/buscar/usuario?page=${this.currentPage2}`);

            // loading
            this.cargando = false;
          })


      }
    }
  }

  /**
   * cargarUsuario
   */
  public cargarUsuario(params: string) {

    // Loading
    this.cargando = true;

    this.usuarioServices.cargarUsuarios(params)
      .subscribe(({ total, usuario, paginate, user }) => {
        this.totalUsuarios = total;
        this.usuarios = usuario;

        this.setPaginator(user);

        this.paginaSiguiente = this.pagination.next_page_url;
        this.paginaAnterior = this.pagination.prev_page_url;

        this.cantPaginas = this.pagination.last_page;
        this.currentPage = this.pagination.current_page;

        // Persistencia de pagina
        localStorage.setItem('urlPagination', `${base_url}/api/user?page=${this.currentPage}`);
        localStorage.setItem('paramsUrl', `${base_url}/api/user?page=${this.currentPage}`)

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
  public eliminarUsuario(usuario: Usuario, bandera: number): any {

    // No puedes darte de baja asi mismo
    const idUserLogin = JSON.parse(String(localStorage.getItem('acces')));
    if (usuario.id === idUserLogin.id) {
      return Swal.fire('Error', 'No puedes darte de baja a si mismo', 'error');
    }


    let id: number;
    let nombre: string;

    // console.log(usuario.id);
    // console.log(bandera);

    if (bandera) {
      id = Number(usuario.id);
      nombre = usuario.persona.nombres;
    } else {
      nombre = String(usuario.nombres);
      id = Number(usuario.id);
    }


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de dar de baja a ${nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioServices.eliminarUsuario(id)
          .subscribe(resp => {
            const parametro = String(localStorage.getItem('urlPagination'));
            if (bandera) {
              this.cargarUsuario(parametro);
            } else {
              const urlUser = String(localStorage.getItem('urlPagination'));
              const nameUsuario = localStorage.getItem('usuario');
              this.cargarUsuarioBuscar(nameUsuario, urlUser);
            }

            Swal.fire(
              'Usuario dado de Baja!',
              `El usuario ${nombre} fue dado de baja correctamente`,
              'success'
            )

          });

      }
    })


  }


}
