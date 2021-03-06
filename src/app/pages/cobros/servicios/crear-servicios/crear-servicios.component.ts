import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventosService } from 'src/app/services/eventos.service';
import { ListasService } from 'src/app/services/listas.service';
import { ServiciosService } from 'src/app/services/servicios.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-crear-servicios',
  templateUrl: './crear-servicios.component.html',
  styleUrls: ['./crear-servicios.component.css']
})
export class CrearServiciosComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventoServices: EventosService,
    private servicoServices: ServiciosService,
    private router: Router,
    private listaServices: ListasService
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
      servicio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', Validators.required],
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
   * ngSubmit
   */
  public onSubmit(event: any) {

    this.listaServices.validarLista()
      .subscribe(({ lista }) => {
        // console.log(lista);
        if (lista.length != 0) {

          Swal.fire({
            icon: 'info',
            title: 'Error',
            text: `No se puede crear un Servicio mientras existan lecturas pendientes!`,
          })

        } else {


          const formData = {
            nombre: this.servicio?.value,
            descripcion: this.descripcion?.value,
            costo: this.precio?.value,
          }

          // console.log(formData);

          this.servicoServices.crearServicio(formData)
            .subscribe(({ servicio }) => {

              // console.log(servicio);
              this.router.navigateByUrl('/dashboard/servicios');

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '??Registro Correcto!',
                text: `El Servicio fue creado corectamente!`,
                showConfirmButton: false,
                timer: 3000
              })
              // this.limpiar();

              // Crear el producto
              const datosForms = {
                nombre: 'servicio',
                producto: servicio.nombre,
                num_producto: servicio.id,
                precio: servicio.costo,
                cantidad: 1
              }
              this.eventoServices.crearProducto(datosForms)
                .subscribe(() => { });

            }, (err) => {
              Swal.fire('Error', err.error.message, 'error')
            }
            );

        }
      });
  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
    this.router.navigateByUrl('/dashboard/servicios');
  }
}
