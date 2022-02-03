import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Mensaje del servicio
  public mensaje: any = {};

  // public usuario: Usuario;
  public menuItems: any[];

  public accesUser: any = {};

  constructor(
    private sidebarServices: SidebarService,
    private usuarioServices: UsuarioService,
    private router: Router
  ) {
    this.menuItems = sidebarServices.menu;
    // this.usuario = usuarioServices.usuario;
    // console.log(this.menuItems);

  }

  ngOnInit(): void {


    this.accesUser = JSON.parse(String(localStorage.getItem('acces')));

    this.usuarioServices.nombreEvento
      .subscribe(texto => {
        this.mensaje = texto;
      })

  }

  /**
   * guardarRuta
   */
  public guardarRuta() {
    localStorage.setItem('guardarRuta', '1');
    localStorage.removeItem('usuario');
  }

  /**
  * logout
  */
  public logout() {
    this.usuarioServices.logout()
      .subscribe(resp => {
        // console.log(resp);
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Cerrando sesión...',
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigateByUrl('/login');
      }, (err => {
        console.log(err);
      })
      );
  }


}
