import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

// Angular Router
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';


@Component({
  selector: 'app-editar-eventos',
  templateUrl: './editar-eventos.component.html',
  styleUrls: ['./editar-eventos.component.css']
})
export class EditarEventosComponent implements OnInit {

  public idEvento: number;

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
    private eventoServices: EventosService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
  ) {

    // Recibiendo el parametro
    this.idEvento = this.rutaActiva.snapshot.params.id;

    this.crearFormulario();

  }

  ngOnInit(): void {

    this.showEvento();
  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      evento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', Validators.required],
      tiempo: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get evento() {
    return this.formulario.get('evento');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }
  get precio() {
    return this.formulario.get('precio');
  }

  get tiempo() {
    return this.formulario.get('tiempo');
  }

  get estado(): any {
    return this.formulario.get('estado');
  }

  /**
   * showUsuario
   */
  public showEvento(): any {

    this.cargando = true;
    this.eventoServices.showEventos(this.idEvento)
      .subscribe(({ evento }) => {

        this.formulario.patchValue({
          evento: evento.evento,
          descripcion: evento.descripcion,
          precio: evento.precio,
          tiempo: evento.tiempo_event,
          estado: evento.estado,
        });
        this.cargando = false;
      });
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    const formData = {
      evento: this.evento?.value,
      descripcion: this.descripcion?.value,
      precio: this.precio?.value,
      tiempo_event: this.tiempo?.value,
      estado: this.estado.value
    }

    // console.log(formData);


    this.eventoServices.updateEventos(formData, this.idEvento)
      .subscribe(() => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `El evento fue modificado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.showEvento();
      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
      }
      );

  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
  }
}
