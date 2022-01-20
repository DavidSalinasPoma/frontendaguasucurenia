
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EventosService } from 'src/app/services/eventos.service';
import { ServiciosService } from 'src/app/services/servicios.service';

import Swal from 'sweetalert2';
import { BarriosService } from 'src/app/services/barrios.service';

@Component({
  selector: 'app-crear-barrio',
  templateUrl: './crear-barrio.component.html',
  styleUrls: ['./crear-barrio.component.css']
})
export class CrearBarrioComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private barriosService: BarriosService
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
      barrio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // Validaciones para formulario
  get barrio() {
    return this.formulario.get('barrio');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }

  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    // console.log(this.formulario.value);


    const formData = {
      nombre: this.barrio?.value,
      descripcion: this.descripcion?.value,
    }

    // console.log(formData);

    this.barriosService.crearBarrio(formData)
      .subscribe(() => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Correcto!',
          text: `El barrio fue creado correctamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.limpiar();
      }, (err) => {
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
