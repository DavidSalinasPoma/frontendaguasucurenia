import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioServices: UsuarioService, private router: Router) { }

  ngOnInit(): void {
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
