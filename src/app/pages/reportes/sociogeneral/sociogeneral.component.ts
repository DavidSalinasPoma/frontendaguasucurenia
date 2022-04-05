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
  selector: 'app-sociogeneral',
  templateUrl: './sociogeneral.component.html',
  styleUrls: ['./sociogeneral.component.css']
})
export class SociogeneralComponent implements OnInit {
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

  }

  /**
   * ngSubmit
   */
  public onSubmit() {

    this.socioServices.reporteSociosGeneral()
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
   * crearPDF
   */
  public crearPDF() {

    // this.router.navigate(['/dashboard/factpagadas']);   
    // alert('Se esta imprimiendo')

  }
}
