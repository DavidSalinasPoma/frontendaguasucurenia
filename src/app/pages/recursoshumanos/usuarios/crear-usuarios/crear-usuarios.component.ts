import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personaServices: PersonaService,
    private usuarioServices: UsuarioService,
    private router: Router
  ) {
    this.cargarPersonas();

    this.crearFormulario();

  }

  ngOnInit(): void {

  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      persona: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      password: ['', Validators.required],
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


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    // Primer caracter
    const id = Number((this.persona?.value).charAt(0));

    const formData = {
      persona_id: id,
      email: this.email?.value,
      password: this.password?.value
    }

    // console.log(formData);

    this.usuarioServices.crearUsuario(formData)
      .subscribe(resp => {
        this.router.navigateByUrl('/dashboard/usuarios');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Correcto!',
          text: `El usuario fue creado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        // this.limpiar();
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      }
      );

  }


  /**
   * indexPersonas
   */
  public cargarPersonas() {

    this.usuarioServices.cargarPersonas()
      .subscribe(resp => {
        const arrayPersona = resp.persona.data;
        // console.log(arrayPersona);
        this.options = [];
        arrayPersona.forEach((element: any) => {
          if (element.estado === 1 || element.estado === '1') {
            this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
          }
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
            if (element.estado === 1 || element.estado === "1") {
              this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
            }
          });
          // console.log(this.options);

        });

    }
  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
    this.router.navigateByUrl('/dashboard/usuarios');
  }
}
