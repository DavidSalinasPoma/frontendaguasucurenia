import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacturaService } from 'src/app/services/factura.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

interface Socio {
  idSocio: number
};

// Variables globales
const base_url = environment.base_url;

@Component({
  selector: 'app-modal-deudores',
  templateUrl: './modal-deudores.component.html',
  styleUrls: ['./modal-deudores.component.css']
})
export class ModalDeudoresComponent implements OnInit {

  public options: any = [];
  public socios2: any = [];
  public total: number = 0;
  public paginaSiguiente2: any;
  public paginaAnterior2: any;
  public currentPage2: number = 1;
  public cantPaginas2: number = 1;
  public totalSaldo: number = 0;
  public socio: any;
  public detalle: any;
  public finalOptions: any;
  // loading
  public cargando: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { idSocio: Socio },
    private facturaServices: FacturaService,
  ) { }

  ngOnInit(): void {
    this.buscarFacturas(this.data.idSocio);
  }

  /**
 * cargarUsuarioBuscar
 */
  public buscarFacturas(texto: any) {



    let urls;
    urls = `${base_url}/api/ubicar/facturas?page=1`

    const formDatos = {
      textos: Number(texto),
      url: urls
    }



    // console.log(formDatos);
    // this.cargando = true;

    this.facturaServices.buscarFacturas(formDatos)
      .subscribe(({ factura }) => {
        // console.log(factura);

        this.socios2 = factura.data;

        this.total = 0;
        let count = 0;
        if (this.socios2.length != 0) {

          this.options = [];
          // Implementando logica de rxjs
          let myArrayOf$: Observable<any>;
          myArrayOf$ = of(...this.socios2);
          myArrayOf$
            .pipe(
              map(data => {
                data.estado = Number(data.estado);
                data.directivo = Number(data.directivo);
                this.options.push(data);
              })
            )
            .subscribe();
          this.socios2 = this.options;

          this.options = [];
          this.socios2.forEach((element: any) => {
            if (element.estado_pago === 0 || element.estado_pago === '0') {
              this.options.push(element);
              this.total = this.total + 1;
              this.totalDetalle(Number(element.idFactura), count);
              count++;
            }
          });



          this.paginaSiguiente2 = factura.next_page_url;
          this.paginaAnterior2 = factura.prev_page_url;
          this.cantPaginas2 = factura.last_page;
          this.currentPage2 = factura.current_page;

          // Persistencia de pagina
          localStorage.setItem('urlPagination', `${base_url}/api/ubicar/facturas?page=${this.currentPage2}`);

          if (this.options.length === 0) {
            this.cargando = false;
            Swal.fire({
              icon: 'info',
              title: 'Facturas',
              text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
            })
          }

        } else {
          // loading
          this.options = [];
          this.total = 0;
          Swal.fire({
            icon: 'info',
            title: 'La factura no exite!',
            text: `El socio con codigo: ${texto} no tiene facturas pendientes!`,
          })
          localStorage.removeItem('usuario');
          const url: any = localStorage.getItem('paramsUrl');
          // this.cargarFacturas(url);
          // localStorage.setItem('urlPagination', `${base_url}/api/buscar/facturas?page=1`);

        }
      })
  }

  /**
  * totalDetalle
  */
  public totalDetalle(item: number, index: number) {
    this.totalSaldo = 0;
    this.facturaServices.showFacturas(item)
      .subscribe(({ detalle }) => {
        // console.log(detalle);
        const { directivo } = detalle[0];

        if (Number(directivo)) {
          let suma = 0;
          if (detalle.length != 0) {
            this.socio = detalle[0];
            this.detalle = detalle;
            // console.log(detalle);
            detalle.forEach((element: any) => {
              suma = suma + Number(element.precioDetalle)
            });
            this.totalSaldo = suma + Number(this.socio.retraso) + Number(this.socio.precioConsumo) - 20;
            this.totalSaldo = Number(this.totalSaldo);
            this.factReunion(this.totalSaldo, item, index);
          } else {
            this.facturaServices.retrasoFactura(item)
              .subscribe(({ factura }) => {
                // console.log(factura);
                this.socio = factura[0];
                this.totalSaldo = Number(this.socio.retraso) + Number(this.socio.precioConsumo) - 20;
                this.totalSaldo = Number(this.totalSaldo);

                this.factReunion(this.totalSaldo, item, index);

              })
          }
        } else {

          this.totalSaldo = 0;
          let suma = 0;
          if (detalle.length != 0) {
            this.socio = detalle[0];
            this.detalle = detalle;
            detalle.forEach((element: any) => {
              suma = suma + Number(element.precioDetalle)
            });

            this.totalSaldo = suma + Number(this.socio.retraso) + Number(this.socio.precioConsumo);
            this.totalSaldo = Number(this.totalSaldo);

            this.factReunion(this.totalSaldo, item, index);
          } else {
            this.facturaServices.retrasoFactura(item)
              .subscribe(({ factura }) => {
                this.socio = factura[0];
                this.totalSaldo = Number(this.socio.retraso) + Number(this.socio.precioConsumo);
                this.totalSaldo = Number(this.totalSaldo);
                console.log(this.totalSaldo);
                this.factReunion(this.totalSaldo, item, index);
              })
          }
        }

      });
  }

  /**
   * factReunion
   */
  public factReunion(totalSaldo: number, item: number, index: number) {

    this.facturaServices.showFacturaReunion(item)
      .subscribe(({ facturaReunion }) => {

        if (facturaReunion.length === 0) {
          const formData = {
            saldo: totalSaldo
          }
          this.finalOptions = Object.assign(this.options[index], formData);

          this.cargando = false;
        } else {
          facturaReunion.forEach((element: any) => {
            totalSaldo = totalSaldo + Number(element.precio);
          });
          const formData = {
            saldo: totalSaldo
          }
          this.finalOptions = Object.assign(this.options[index], formData);
          this.cargando = false;
        }
      })
  }
  public crearPDF() {

  }

}
