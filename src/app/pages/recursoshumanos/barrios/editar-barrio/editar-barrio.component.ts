
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { BarriosService } from 'src/app/services/barrios.service';

// Angular Router
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-editar-barrio',
  templateUrl: './editar-barrio.component.html',
  styleUrls: ['./editar-barrio.component.css']
})
export class EditarBarrioComponent implements OnInit {

  public estados = [
    { value: 1, estado: 'Activado' },
    { value: 0, estado: 'Desactivado' }
  ];

  public idBarrio: number;

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
    private servicioServices: ServiciosService,
    private barriosService: BarriosService,
    private router: Router
  ) {

    // Recibiendo el parametro
    this.idBarrio = this.rutaActiva.snapshot.params.id;

    this.crearFormulario();

  }

  ngOnInit(): void {

    this.showBarrios();
  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      barrio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get barrio() {
    return this.formulario.get('barrio');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }

  get estado(): any {
    return this.formulario.get('estado');
  }

  /**
   * showUsuario
   */
  public showBarrios(): any {

    this.cargando = true;
    this.barriosService.showBarrios(this.idBarrio)
      .subscribe(({ barrio }) => {
        console.log(barrio);

        this.formulario.setValue({
          barrio: barrio.nombre,
          descripcion: barrio.descripcion,
          estado: Number(barrio.estado),
        });
        this.cargando = false;
      });
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    const formData = {
      nombre: this.barrio?.value,
      descripcion: this.descripcion?.value,
      estado: this.estado.value
    }

    // console.log(formData);


    this.barriosService.updateBarrios(formData, this.idBarrio)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/barrios');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `El barrio fue modificado correctamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.showBarrios();
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
    this.router.navigateByUrl('/dashboard/barrios');
  }
}
