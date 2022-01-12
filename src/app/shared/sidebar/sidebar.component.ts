import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private usuarioServices: UsuarioService
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


}
