import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  // Select
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

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personaServices: PersonaService,
    private router: Router
  ) {

    this.crearFormulario();

  }

  ngOnInit(): void {

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
  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    // console.log(this.formulario.value);


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
      estado_civil: this.ecivil?.value
    }

    // console.log(formData);

    this.personaServices.crearPersonas(formData)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/personas');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Correcto!',
          text: `La persona fue registrada correctamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        // this.limpiar();
      }, (err) => {
        if (err.error.status === 'err') {
          Swal.fire('Error', err.error.message, 'error')
        } else {
          Swal.fire('Error', (err.ok === false) ? err.error.errors.carnet[0] : err.error.message, 'error')
        }
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
