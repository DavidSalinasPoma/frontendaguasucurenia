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
    this.usuarioServices.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp);

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
          text: `Bienvenid@`,
          showConfirmButton: false,
          timer: 3000
        })
        // Navegar al dashboar
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1000);

      }, (err) => {
        // Si sucede un error
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')

      }
      )
  }


}
