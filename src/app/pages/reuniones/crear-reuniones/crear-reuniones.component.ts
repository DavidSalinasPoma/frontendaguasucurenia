
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { BarriosService } from 'src/app/services/barrios.service';
import { Router } from '@angular/router';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { ListasService } from 'src/app/services/listas.service';


@Component({
  selector: 'app-crear-reuniones',
  templateUrl: './crear-reuniones.component.html',
  styleUrls: ['./crear-reuniones.component.css']
})
export class CrearReunionesComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  // Ocultar boton al guardar
  public ocultar: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private barriosService: BarriosService,
    private reunionesService: ReunionesService,
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
      nombreReunion: ['', [Validators.required]],
      multaReunion: ['', [Validators.required]],
      fechaReunion: ['', [Validators.required]],
    });
  }

  // Validaciones para formulario
  get nombreReunion() {
    return this.formulario.get('nombreReunion');
  }
  get multaReunion() {
    return this.formulario.get('multaReunion');
  }
  get fechaReunion() {
    return this.formulario.get('fechaReunion');
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
            text: `No se puede crear una Reunión mientras existan lecturas pendientes!`,
          })

        } else {

          const formData = {
            reunion: this.nombreReunion?.value,
            multa: this.multaReunion?.value,
            fecha: this.fechaReunion?.value,
          }

          // console.log(formData);
          this.ocultar = false;
          this.reunionesService.storeReunion(formData)
            .subscribe(() => {
              this.ocultar = true;
              this.router.navigateByUrl('/dashboard/listaReunion');
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Registro Correcto!',
                text: `La reunión fue creado correctamente!`,
                showConfirmButton: false,
                timer: 3000
              })
              // this.limpiar();
            }, (err) => {
              console.log(err);
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
    this.router.navigateByUrl('/dashboard/barrios');
  }
}

