import { Component, OnInit } from '@angular/core';
// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// servicios
import { BarriosService } from 'src/app/services/barrios.service';
import { SociosService } from 'src/app/services/socios.service';

@Component({
  selector: 'app-socioxbarrio',
  templateUrl: './socioxbarrio.component.html',
  styleUrls: ['./socioxbarrio.component.css']
})
export class SocioxbarrioComponent implements OnInit {
  public options: any[] = [];
  public optionsBarrios: any[] = [];
  public listaSocios: any[] = [];
  public mostrarSocios: boolean = false;
  public barrioName: string = '';
  // Formularios
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private barrioServices: BarriosService,
    private socioServices: SociosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarBarrios();
  }
  /**
  * formulario
  */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      barrio: ['', [Validators.required]],
    });
  }
  get barrio() {
    return this.formulario.get('barrio');
  }


  /**
   * ngSubmit
   */
  public onSubmit(event: any) {
    // Sacar codigo
    let codigoBarrio = (this.barrio?.value).split(':');
    // Primer numero
    const idBarrio = Number(codigoBarrio[0]);

    this.socioServices.socioporBarrio(idBarrio)
      .subscribe(({ socio }) => {
        // console.log(socio);

        this.barrioName = socio[0].barrio;

        // Implementando logica de rxjs
        let myArrayOf$: Observable<any>;

        myArrayOf$ = of(...socio);
        this.listaSocios = [];
        myArrayOf$
          .pipe(
            map(data => {
              data.estado = Number(data.estado);
              data.directivo = Number(data.directivo);
              this.listaSocios.push(data);
            })
          )
          .subscribe();
        this.mostrarSocios = true;
      });
  }


  /**
   * cargarBarrios
   */
  public cargarBarrios() {
    this.socioServices.cargarBarrios()
      .subscribe(resp => {

        const arrayPersona = resp.barrio.data;

        this.optionsBarrios = [];
        arrayPersona.forEach((element: any) => {
          if (element.estado === 1 || element.estado === '1') {
            this.optionsBarrios.push(`${element.id}: ${element.nombre}`);
          }
        });

      });
  }


  /**
   * buscarBarrio
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

          this.optionsBarrios = [];
          const arrayPersona = resp.barrio.data;

          arrayPersona.forEach((element: any) => {
            if (element.estado === 1 || element.estado === "1") {
              this.optionsBarrios.push(`${element.id}: ${element.nombre}`);
            }
          });

        });

    }
  }
  /**
   * crearPDF
   */
  public crearPDF() {

    // this.router.navigate(['/dashboard/factpagadas']);   
    // alert('Se esta imprimiendo')

  }
}
