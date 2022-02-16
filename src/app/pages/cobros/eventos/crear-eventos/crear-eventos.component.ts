import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventosService } from 'src/app/services/eventos.service';
import { ListasService } from 'src/app/services/listas.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.css']
})
export class CrearEventosComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventoServices: EventosService,
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
      evento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', Validators.required],
      tiempo: ['', Validators.required],
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
   * ngSubmit
   */
  public onSubmit(event: any) {

    // Verificar que listas este vacio para crear un evento

    this.listaServices.validarLista()
      .subscribe(({ lista }) => {
        // console.log(lista);
        if (lista.length != 0) {

          Swal.fire({
            icon: 'info',
            title: 'Error',
            text: `No se puede crear un evento mientras existan lecturas pendientes!`,
          })

        } else {

          const formData = {
            evento: this.evento?.value,
            descripcion: this.descripcion?.value,
            precio: this.precio?.value,
            tiempo_event: this.tiempo?.value,
          }
          this.eventoServices.crearEvento(formData)
            .subscribe(({ evento }) => {
              // console.log(evento);
              this.router.navigateByUrl('/dashboard/eventos');
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Registro Correcto!',
                text: `El Evento fue creado corectamente!`,
                showConfirmButton: false,
                timer: 3000
              })
              // this.limpiar();

              // Crear el producto
              const datosForms = {
                nombre: 'evento',
                producto: evento.evento,
                num_producto: evento.id,
                precio: evento.precio,
                cantidad: evento.tiempo_event
              }
              this.eventoServices.crearProducto(datosForms)
                .subscribe(() => { })

            }, (err) => {
              Swal.fire('Error', err.error.message, 'error')
            }
            );

        }



      })



  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
    this.router.navigateByUrl('/dashboard/eventos');
  }
}

