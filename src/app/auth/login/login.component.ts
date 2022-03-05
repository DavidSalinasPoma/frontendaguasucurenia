import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public cargando = false;

  // Formulario 
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  // Login de usuarios
  /**
   * login
   */
  public login() {
    this.cargando = true;
    this.usuarioServices.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
        this.cargando = false;
        // Usuarios del sistema
        const userSistema: any = {
          id: resp.users.id,
          nombre: resp.users.persona.nombres,
          paterno: resp.users.persona.ap_paterno,
          materno: resp.users.persona.ap_materno,
          email: resp.users.email,
          fecha: resp.users.created_at
        }

        // Variables local de usuario autenticado
        localStorage.setItem('acces', JSON.stringify(userSistema));

        // remember
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        } else {
          localStorage.removeItem('email');
        }

        // console.log(respToken);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Login correcto!',
          text: `Bienvenid@ ${resp.users.persona.nombres} ${resp.users.persona.ap_paterno} ${resp.users.persona.ap_materno}`,
          showConfirmButton: false,
          timer: 4000
        })
        // Navegar al dashboar
        // setTimeout(() => {
        // this.router.navigateByUrl('/');
        // }, 1000);

      }, (err) => {
        // Si sucede un error
        // console.log(err);

        Swal.fire('Error', err.error.message, 'error')
        this.cargando = false;

      }
      )
  }


}
