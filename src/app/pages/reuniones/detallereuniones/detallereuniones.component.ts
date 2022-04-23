import { DetallereunionService } from './../../../services/detallereunion.service';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



// RxJS
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleReuniones } from 'src/app/models/detalleReuniones.models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Variables globales
const base_url = environment.base_url;

@Component({
  selector: 'app-detallereuniones',
  templateUrl: './detallereuniones.component.html',
  styleUrls: ['./detallereuniones.component.css']
})
export class DetallereunionesComponent implements OnInit {

  public totalSocios: number = 0;
  public ListaSocios: DetalleReuniones[] = [];

  // loading
  public cargando: boolean = true;

  // Mejorar el performance de la busqueda
  private OnDestroy$ = new Subject();
  public searchTerm$ = new Subject<string>();

  // Angular Material
  myControl = new FormControl();

  // Formularios
  public formulario!: FormGroup;

  public idReunion: number;

  constructor(
    private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private detalleReunionServices: DetallereunionService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.crearFormulario();
    // Recibiendo el parametro
    this.idReunion = this.rutaActiva.snapshot.params.id;
  }


  ngOnDestroy(): void {
    // Para que se deatruya despues de salir de esta vista
    this.OnDestroy$.next();
  }

  ngOnInit(): void {
    this.cargarListaSocios();
  }

  /**
 * formulario
 */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      opcion: ['', [Validators.required]],
    });
  }

  // Validaciones para formulario
  get opcion() {
    return this.formulario.get('opcion');
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any, detalle_id: any) {

    const formData = {
      opcion: this.opcion?.value,
      estado: 1

    }
    // console.log(formData);
    this.detalleReunionServices.updateDetallesReunion(formData, detalle_id)
      .subscribe(resp => {

        this.toastr.success('Se guardo correctamente!!', 'Registro correcto');
        // this.showUsuario();
        this.cargarListaSocios();

        if (this.totalSocios === 1) {

          const formDataLista = {
            estado: 1
          }
          // Actualizando el estado de la lista de reuniones
          this.detalleReunionServices.updateListaReunion(formDataLista, this.idReunion)
            .subscribe(resp => {
              this.router.navigateByUrl('/dashboard/listaReunion');
              this.toastr.info('Registro de multas completada!', 'Registro');
            }, (err) => {
              console.log(err);

              Swal.fire('Error', err.error.message, 'error')
            }
            )

        }

        this.formulario.reset();
      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
      }
      );

  }

  /**
   * cargarListaSocios
   */
  public cargarListaSocios() {
    // Loading
    this.cargando = true;
    this.detalleReunionServices.showDetalleReuniones(this.idReunion)
      .subscribe(({ detalle }) => {

        // console.log(detalle);
        this.totalSocios = detalle.total;

        if (detalle.data.length === 0) {
          this.ListaSocios = [];
          this.cargando = false;
        } else {
          let myArrayOf$: Observable<any>;

          myArrayOf$ = of(detalle.data);

          myArrayOf$.pipe(map((data, index) => {
            data[index].estado = Number(data[index].estado);
            return data;
          }))
            .subscribe(resp => {
              this.ListaSocios = resp;
            })

          this.cargando = false;
        }

      }, (err => {
        console.log(err);

      })
      )
  }

}