import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

// Angular Router
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  public idUsuario: number;

  // Angular Material
  myControl = new FormControl();
  options: string[] = [];

  // Formularios
  public formulario!: FormGroup;

  // loading
  public cargando: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private personaServices: PersonaService,
    private usuarioServices: UsuarioService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
  ) {

    // Recibiendo el parametro
    this.idUsuario = this.rutaActiva.snapshot.params.id;
    // console.log(this.idUsuario);
    this.cargarPersonas();

    this.crearFormulario();

  }

  ngOnInit(): void {

    this.showUsuario();
  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      persona: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      password: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get persona() {
    return this.formulario.get('persona');
  }
  get email() {
    return this.formulario.get('email');
  }
  get password() {
    return this.formulario.get('password');
  }

  get estado(): any {
    return this.formulario.get('estado');
  }

  /**
   * showUsuario
   */
  public showUsuario(): any {

    // No puedes darte de baja asi mismo
    const idUserLogin = JSON.parse(String(localStorage.getItem('acces')));

    if (Number(this.idUsuario) === Number(idUserLogin.id)) {

      // Navegar al dashboa
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard/usuarios');
      }, 1000);
      return Swal.fire('Error', 'No puedes modificar tu registro a si mismo', 'error');
    }


    this.cargando = true;
    this.usuarioServices.showUsuarios(this.idUsuario)
      .subscribe(resp => {

        this.formulario.patchValue({
          persona: `${resp.usuario.persona.id}: ${resp.usuario.persona.nombres} ${resp.usuario.persona.ap_paterno} ${resp.usuario.persona.ap_materno}`,
          email: resp.usuario.email,
          password: 'Ingrese nueva contraseña',
          estado: resp.usuario.estado,
        });
        this.cargando = false;
      });
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    // Primer caracter
    const id = Number((this.persona?.value).charAt(0));

    const formData = {
      persona_id: id,
      email: this.email?.value,
      estado: this.estado.value,
      password: this.password?.value
    }

    // console.log(formData);


    this.usuarioServices.updateUsuarios(formData, this.idUsuario)
      .subscribe(resp => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `El usuario fue modificado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.showUsuario();
      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
      }
      );

  }


  /**
   * indexPersonas
   */
  public cargarPersonas() {
    this.personaServices.cargarPersonas()
      .subscribe(resp => {
        const arrayPersona = resp.persona.data;
        // console.log(arrayPersona);

        arrayPersona.forEach((element: any) => {
          // console.log(element);
          this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
        });

        // console.log(this.options);
      });
  }

  /**
   * buscarPersona
   */
  public buscarPersona(text: any) {
    if (text === '') {
      this.options = [];
      this.cargarPersonas();
    } else {


      const formDatos = {
        textos: text
      }

      this.personaServices.buscarPersonas(formDatos)
        .subscribe(resp => {
          // console.log(resp);
          this.options = [];
          const arrayPersona = resp.persona.data;
          // console.log(arrayPersona);

          arrayPersona.forEach((element: any) => {
            // console.log(element);
            if (element.estado === 1 || element.estado === "1") {

              this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
            }
          });

        });

    }
  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
  }
}
