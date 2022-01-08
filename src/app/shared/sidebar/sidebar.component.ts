import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // public usuario: Usuario;
  public menuItems: any[];

  constructor(
    private sidebarServices: SidebarService,
    private usuarioServices: UsuarioService
  ) {
    this.menuItems = sidebarServices.menu;
    // this.usuario = usuarioServices.usuario;
    // console.log(this.menuItems);

  }

  ngOnInit(): void {
  }


}
