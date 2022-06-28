import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FacturaReunionService } from 'src/app/services/factura-reunion.service';

interface Retraso {
  value: string;
  viewValue: string;
}

declare var jQuery: any;

@Component({
  selector: 'app-modificar-reunion',
  templateUrl: './modificar-reunion.component.html',
  styleUrls: ['./modificar-reunion.component.css']
})
export class ModificarReunionComponent implements OnInit {

  // Formularios
  public formulario!: FormGroup;
  public formularioModal!: FormGroup;

  // Loading
  public cargando: boolean = false;

  public tabla: boolean = true;

  public mostrar: boolean = false;

  // Fecha reporte
  public fechaReporte = new Date();

  // Lista de multas
  public multas: any = [];


  // Modificar reunion
  public dataUpdated: any = {};

  // Fecha global
  public dataFechaInput: any = {};


  public opciones: Retraso[] = [
    { value: 'si', viewValue: 'Asistió' },
    { value: 'no', viewValue: 'Faltó' },
    { value: 'retraso', viewValue: 'Retraso' },
  ];

  // Manipulando el DOM
  @ViewChild('modificar', { static: true }) modalEditar!: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    private facturaReunionServices: FacturaReunionService,
    private toastr: ToastrService,
    private renderer2: Renderer2
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  /**
 * formulario
 */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      fechaReunion: ['', [Validators.required]]
    });
    this.formularioModal = this.formBuilder.group({
      tipoMulta: ['', [Validators.required]]
    });
  }
  get fechaReunion() {
    return this.formulario.get('fechaReunion');
  }
  get tipoMulta() {
    return this.formulario.get('tipoMulta');
  }
  /**
   * onSubmit
   */
  public onSubmit(event: any) {
    this.multas = [];
    this.cargando = true;
    this.tabla = false;
    this.dataFechaInput = {
      fecha: new Date(this.formulario.value.fechaReunion).toLocaleDateString()
    };
    // Petición http
    this.facturaReunionServices.indexFacturaReunion(this.dataFechaInput)
      .subscribe(({ facturaReunion }) => {
        if (facturaReunion.length === 0) {
          this.cargando = false;
          this.tabla = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe reunión para la fecha Selecionada!',
            footer: '<a>Sistema de cobros de agua potable</a>'
          })

        } else {

          this.toastr.success('Reuniones', 'Lista de multas encontradas');
          this.multas = facturaReunion;
          this.cargando = false;
          this.tabla = true;
          console.log(this.multas);

        }

      }, (err) => {
        console.log(err);
      }
      );
  }

  /**
   * cargarListaReunion
   */
  public cargarListaReunion() {
    this.cargando = true;
    this.tabla = false;
    // Petición http
    this.facturaReunionServices.indexFacturaReunion(this.dataFechaInput)
      .subscribe(({ facturaReunion }) => {
        // Cerrar modal
        jQuery('#myModal_editar').modal('hide');
        this.multas = facturaReunion;
        this.cargando = false;
        this.tabla = true;
        this.toastr.success('La modificación se hizó creectamente', 'Modificación');
      }, (err) => {
        console.log(err);
      }
      );
  }

  /**
   * onSubmitModal
   */
  public onSubmitModal(event: any) {

    if (this.dataUpdated.estadoPago) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede modificar, esta multa ya se pagó!',
        footer: '<a>Sistema de cobros de agua potable</a>'
      })
    } else {
      let data: any;
      switch (this.formularioModal.value.tipoMulta) {
        case 'si':
          data = {
            id: this.dataUpdated.idFactReunion,
            opcion: 'si',
            precio: 0,
            reunion_id: this.dataUpdated.idReunion,
            socio_id: this.dataUpdated.idSocio
          }
          break;
        case 'no':
          data = {
            id: this.dataUpdated.idFactReunion,
            opcion: 'no',
            precio: this.dataUpdated.multa,
            reunion_id: this.dataUpdated.idReunion,
            socio_id: this.dataUpdated.idSocio
          }
          break;
        case 'retraso':
          data = {
            id: this.dataUpdated.idFactReunion,
            opcion: 'retraso',
            precio: 5,
            reunion_id: this.dataUpdated.idReunion,
            socio_id: this.dataUpdated.idSocio
          }
          break;

        default:
          break;
      }

      // Modificando opcion reunión
      this.facturaReunionServices.updatedFacturaReunion(data)
        .subscribe(resp => {
          this.cargarListaReunion();
        }, (err) => {
          console.log(err);

        });


    }

  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
  }

  /**
  * codigoSocio
  */
  public editarMulta(idFactReunion: number, idReunion: number, idSocio: string, estado_pago: number, opcion: string, precio: number, multa: number) {
    const codigo_socio = Number(idSocio);

    this.dataUpdated = {
      idFactReunion: Number(idFactReunion),
      idReunion: Number(idReunion),
      idSocio: codigo_socio,
      estadoPago: Number(estado_pago),
      opcion: opcion,
      precio: Number(precio),
      multa: Number(multa),
    }

    this.formularioModal.setValue({
      tipoMulta: opcion,
    });
  }

  /**
 * crearPDF
 */
  public crearPDF() {

  }

}

