import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarriosService } from 'src/app/services/barrios.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SociosService } from 'src/app/services/socios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-socio',
  templateUrl: './crear-socio.component.html',
  styleUrls: ['./crear-socio.component.css']
})
export class CrearSocioComponent implements OnInit {

  // Angular Material
  myControl = new FormControl();
  public options: any[] = [];
  public optionsBarrios: any[] = [];

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personaServices: PersonaService,
    private socioServices: SociosService,
    private barrioServices: BarriosService,
    private router: Router
  ) {
    this.cargarPersonas();
    this.cargarBarrios();

    this.crearFormulario();

  }

  ngOnInit(): void {

  }

  /**
   * formulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      persona: ['', [Validators.required]],
      barrio: ['', [Validators.required]]
    });
  }

  // Validaciones para formulario
  get persona() {
    return this.formulario.get('persona');
  }
  get barrio() {
    return this.formulario.get('barrio');
  }



  /**
   * ngSubmit
   */
  public onSubmit(event: any) {


    // Sacar codigo
    let codigoSocio = (this.persona?.value).split(':');
    let codigoBarrio = (this.barrio?.value).split(':');

    // Primer numero
    const id = Number(codigoSocio[0]);
    const idBarrio = Number(codigoBarrio[0]);

    const formData = {
      persona_id: id,
      barrio_id: idBarrio
    }

    // console.log(formData);

    this.socioServices.crearSocio(formData)
      .subscribe(resp => {
        this.router.navigateByUrl('/dashboard/socios');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Correcto!',
          text: `El socio fue creado corectamente!`,
          showConfirmButton: false,
          timer: 3000
        })
        // this.limpiar();
        this.cargarPersonas();
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      }
      );

  }

  /**
   * cargarBarrios
   */
  public cargarBarrios() {
    this.socioServices.cargarBarrios()
      .subscribe(resp => {
        // console.log(resp);

        const arrayPersona = resp.barrio.data;
        // console.log(arrayPersona);
        this.optionsBarrios = [];
        arrayPersona.forEach((element: any) => {
          if (element.estado === 1 || element.estado === '1') {
            this.optionsBarrios.push(`${element.id}: ${element.nombre}`);
          }
        });

        // console.log(this.optionsBarrios);
      });
  }

  /**
   * buscarPersona
   */
  public buscarBarrio(text: any) {
    if (text === '') {
      this.options = [];
      this.cargarBarrios();
    } else {


      const formDatos = {
        textos: text
      }

      this.barrioServices.buscarBarriosCrear(formDatos)
        .subscribe(resp => {
          // console.log(resp);
          this.optionsBarrios = [];
          const arrayPersona = resp.barrio.data;
          // console.log(arrayPersona);

          arrayPersona.forEach((element: any) => {
            if (element.estado === 1 || element.estado === "1") {
              this.optionsBarrios.push(`${element.id}: ${element.nombre}`);
            }
          });
          // console.log(this.options);

        });

    }
  }



  /**
   * indexPersonas
   */
  public cargarPersonas() {

    this.socioServices.cargarPersonas()
      .subscribe(resp => {
        const arrayPersona = resp.persona.data;
        // console.log(arrayPersona);
        this.options = [];
        arrayPersona.forEach((element: any) => {
          if ((element.estado === 1 || element.estado === '1') && (element.socio === 0 || element.socio === '0')) {
            this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
          }
        });

        // console.log(this.options);
      });
  }

  /**
   * buscarPersona
   */
  public buscarPersona(text: any) {

    // console.log(text);

    if (text === '') {
      this.options = [];
      this.cargarPersonas();
    } else {
      const formDatos = {
        textos: text
      }

      this.personaServices.buscarPersonasCrear(formDatos)
        .subscribe(resp => {
          // console.log(resp);
          this.options = [];
          const arrayPersona = resp.persona.data;
          // console.log(arrayPersona);

          arrayPersona.forEach((element: any) => {

            // console.log(element);

            if ((element.estado === 1 || element.estado === '1') && (element.socio === 0 || element.socio === '0')) {
              this.options.push(`${element.id}: ${element.nombres} ${element.ap_paterno} ${element.ap_materno}`);
            }
          });
          // console.log(this.options);

        });

    }
  }

  /**
   * limpiar
   */
  public limpiar() {
    this.formulario.reset();
    this.router.navigateByUrl('/dashboard/socios');
  }
}

