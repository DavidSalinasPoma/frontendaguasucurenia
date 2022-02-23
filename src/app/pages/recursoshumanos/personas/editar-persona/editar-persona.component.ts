
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { BarriosService } from 'src/app/services/barrios.service';

// Angular Router
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  // Select
  public estados = [
    { value: 1, estado: 'Activado' },
    { value: 0, estado: 'Desactivado' }
  ];

  public expeditos = [
    { value: 'CH', ciudad: 'Chuquisaca' },
    { value: 'LP', ciudad: 'La Paz' },
    { value: 'CB', ciudad: 'Cochabamba' },
    { value: 'OR', ciudad: 'Oruro' },
    { value: 'PT', ciudad: 'Potosi' },
    { value: 'TJ', ciudad: 'Tarija' },
    { value: 'SC', ciudad: 'Santa Cruz' },
    { value: 'BE', ciudad: 'Beni' },
    { value: 'PD', ciudad: 'Pando' },
  ];

  public civil = [
    { value: 'Soltero', estados: 'Soltero' },
    { value: 'Casado', estados: 'Casado' }
  ];

  public generos = [
    { value: 'Masculino', sexo: 'Masculino' },
    { value: 'Femenino', sexo: 'Femenino' }
  ];



  public idPersona: number;

  // Angular Material
  myControl = new FormControl();
  options: string[] = [];

  // Formularios
  public formulario!: FormGroup;

  // loading
  public cargando: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private personaServices: PersonaService
  ) {

    // Recibiendo el parametro
    this.idPersona = this.rutaActiva.snapshot.params.id;

    this.crearFormulario();

  }

  ngOnInit(): void {

    this.showPersonas();
  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: [''],
      carnet: ['', [Validators.required]],
      expedito: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      celular: ['', [Validators.required]],
      celularF: ['', [Validators.required]],
      nacimiento: ['', [Validators.required]],
      ecivil: ['', [Validators.required]],
      estado: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get nombres() {
    return this.formulario.get('nombres');
  }
  get paterno() {
    return this.formulario.get('paterno');
  }
  get materno() {
    return this.formulario.get('materno');
  }
  get carnet() {
    return this.formulario.get('carnet');
  }
  get expedito() {
    return this.formulario.get('expedito');
  }
  get sexo() {
    return this.formulario.get('sexo');
  }
  get direccion() {
    return this.formulario.get('direccion');
  }
  get email() {
    return this.formulario.get('email');
  }
  get celular() {
    return this.formulario.get('celular');
  }
  get celularF() {
    return this.formulario.get('celularF');
  }
  get nacimiento() {
    return this.formulario.get('nacimiento');
  }
  get ecivil() {
    return this.formulario.get('ecivil');
  }
  get estado(): any {
    return this.formulario.get('estado');
  }

  /**
   * showUsuario
   */
  public showPersonas(): any {

    this.cargando = true;
    this.personaServices.showPersonas(this.idPersona)
      .subscribe(({ persona }) => {

        this.formulario.setValue({
          nombres: persona.nombres,
          paterno: persona.ap_paterno,
          materno: persona.ap_materno,
          carnet: persona.carnet,
          expedito: persona.expedito,
          sexo: persona.sexo,
          direccion: persona.direccion,
          email: persona.email,
          celular: persona.celular,
          celularF: persona.celular_familiar,
          nacimiento: persona.nacimiento,
          ecivil: persona.estado_civil,
          estado: Number(persona.estado),
        });
        this.cargando = false;
      });
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    const formData = {
      carnet: this.carnet?.value,
      expedito: this.expedito?.value,
      nombres: this.nombres?.value,
      ap_paterno: this.paterno?.value,
      ap_materno: this.materno?.value,
      sexo: this.sexo?.value,
      direccion: this.direccion?.value,
      email: this.email?.value,
      celular: this.celular?.value,
      celular_familiar: this.celularF?.value,
      nacimiento: this.nacimiento?.value,
      estado_civil: this.ecivil?.value,
      estado: this.estado.value
    }

    // console.log(formData);

    this.personaServices.updatePersonas(formData, this.idPersona)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/personas');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `La persona fue modificado correctamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.showPersonas();
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
    this.router.navigateByUrl('/dashboard/personas');
  }
}
