
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// Angular Router
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-editar-servicios',
  templateUrl: './editar-servicios.component.html',
  styleUrls: ['./editar-servicios.component.css']
})
export class EditarServiciosComponent implements OnInit {

  public estados = [
    { value: 1, estado: 'Activado' },
    { value: 0, estado: 'Desactivado' }
  ];

  public idServicio: number;

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
    private servicioServices: ServiciosService
  ) {

    // Recibiendo el parametro
    this.idServicio = this.rutaActiva.snapshot.params.id;

    this.crearFormulario();

  }

  ngOnInit(): void {

    this.showServicios();
  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      servicio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get servicio() {
    return this.formulario.get('servicio');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }
  get precio() {
    return this.formulario.get('precio');
  }

  get estado(): any {
    return this.formulario.get('estado');
  }

  /**
   * showUsuario
   */
  public showServicios(): any {

    this.cargando = true;
    this.servicioServices.showServicios(this.idServicio)
      .subscribe(({ servicio }) => {

        this.formulario.setValue({
          servicio: servicio.nombre,
          descripcion: servicio.descripcion,
          precio: servicio.costo,
          estado: servicio.estado,
        });
        this.cargando = false;
      });
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {

    const formData = {
      nombre: this.servicio?.value,
      descripcion: this.descripcion?.value,
      costo: this.precio?.value,
      estado: this.estado.value
    }

    // console.log(formData);


    this.servicioServices.updateServicios(formData, this.idServicio)
      .subscribe(() => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `El servicio fue modificado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        this.showServicios();
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
