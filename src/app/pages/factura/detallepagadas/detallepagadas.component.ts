
import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PdfMakeWrapper } from 'pdfmake-wrapper';


// Sector generar PDF
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
// import * as pdfMake from 'pdfmake/build/pdfMake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// Numeros a letras

declare var numeroALetras: any;
declare var covertirNumLetras: any;


@Component({
  selector: 'app-detallepagadas',
  templateUrl: './detallepagadas.component.html',
  styleUrls: ['./detallepagadas.component.css']
})
export class DetallepagadasComponent implements OnInit {

  public socio: any;
  public detalle: any;
  public total: any;
  public idFactura: any;
  public retraso: boolean = true;
  public directivoMenor: boolean = false;


  // loading
  public cargando: boolean = true;

  public fecha: any;

  public letras: string = '';

  // Factura para directivo
  public mostraDirectivoMenor: boolean = false;
  public mostraDirectivoMayor: boolean = false;
  public facturaDirectivo: any = [];
  public facturaReunion: any;
  constructor(
    private facturaServices: FacturaService,
    private rutaActiva: ActivatedRoute,
    private dataServices: DataService,
    private router: Router
  ) {
    // Recibiendo el parametro
    this.idFactura = this.rutaActiva.snapshot.params.id;
    this.showFacturas(this.idFactura);
    // Numero a letras
    // numeroALetras.init();
  }

  ngOnInit(): void {

    // Fecha actual
    // const tiempoTranscurrido = Date.now();
    // const hoy = new Date(tiempoTranscurrido);
    // this.fecha = hoy.toDateString(); // "Sun Jun 14 2020"
    // // console.log(this.fecha);

  }

  /**
   * cancelar
   */
  public cancelar() {
    // this.dataServices.idSocio$.emit(this.socio.idSocio);
    this.router.navigate(['/dashboard/factpagadas']);

  }

  /**
   * showFacturas
   */
  public showFacturas(item: number) {

    // Hacer la consulta a facturas??
    this.facturaServices.showFacturasDirectivos(item)
      .subscribe(({ factura }) => {

        // console.log(factura);

        const { directivo, precioConsumo } = factura[0];

        if (Number(directivo) && precioConsumo <= 20) {

          this.facturaDirectivo = factura[0];
          // console.log(this.facturaDirectivo);

          this.mostraDirectivoMenor = true;
          this.cargando = false;
          // Convertir numeros a letras
          this.letras = covertirNumLetras(String(this.facturaDirectivo.total_pagado));
        } else {
          this.facturaServices.showFacturas(item)
            .subscribe(({ detalle }) => {

              const { directivo } = detalle[0];

              if (Number(directivo)) {
                this.fecha = detalle[0].fecha_emision;
                let suma: number = 0;
                if (detalle.length != 0) {
                  this.socio = detalle[0];
                  this.detalle = detalle;
                  detalle.forEach((element: any) => {
                    suma = suma + Number(element.precioDetalle)
                  });

                  // console.log(this.socio);

                  if (Number(this.socio.directivo) && Number(this.socio.precioConsumo) <= 20) {
                    this.total = Number(this.socio.precioConsumo);
                    this.letras = covertirNumLetras(String(this.total));
                    this.directivoMenor = true;
                  } else {
                    if (Number(this.socio.retraso) === 0) {
                      this.retraso = false;
                    } else {
                      this.retraso = true;
                    }

                    this.total = suma + Number(this.socio.retraso) + Number(this.socio.precioConsumo) - 20;
                    this.factReunion(this.total, item);
                    this.cargando = false;

                    // Convertir numeros a letras
                    // this.letras = covertirNumLetras(String(this.total));
                    this.mostraDirectivoMayor = true;
                  }

                } else {
                  this.facturaServices.retrasoFactura(item)
                    .subscribe(({ factura }) => {
                      // console.log(factura);
                      this.socio = factura[0];

                      if (Number(this.socio.retraso) === 0) {
                        this.retraso = false;
                      } else {
                        this.retraso = true;
                      }

                      this.total = Number(this.socio.retraso) + Number(this.socio.precioConsumo) - 20;
                      this.factReunion(this.total, item);
                      this.cargando = false;
                      // Convertir numeros a letras
                      // this.letras = covertirNumLetras(String(this.total));
                      this.mostraDirectivoMayor = true;
                    })
                }
              } else {
                this.fecha = detalle[0].fecha_emision;
                let suma = 0;
                if (detalle.length != 0) {
                  this.socio = detalle[0];
                  this.detalle = detalle;
                  detalle.forEach((element: any) => {
                    suma = suma + Number(element.precioDetalle)
                  });


                  if (Number(this.socio.directivo) && Number(this.socio.precioConsumo) <= 20) {
                    this.total = Number(this.socio.precioConsumo);
                    this.letras = covertirNumLetras(String(this.total));
                    this.directivoMenor = true;
                  } else {
                    if (Number(this.socio.retraso) === 0) {
                      this.retraso = false;
                    } else {
                      this.retraso = true;
                    }

                    this.total = suma + Number(this.socio.retraso) + Number(this.socio.precioConsumo);
                    this.factReunion(this.total, item);
                    this.cargando = false;

                    // Convertir numeros a letras
                    // this.letras = covertirNumLetras(String(this.total));
                    this.mostraDirectivoMayor = false;
                  }

                } else {
                  this.facturaServices.retrasoFactura(item)
                    .subscribe(({ factura }) => {
                      // console.log(factura);
                      this.socio = factura[0];

                      if (Number(this.socio.retraso) === 0) {
                        this.retraso = false;
                      } else {
                        this.retraso = true;
                      }

                      this.total = Number(this.socio.retraso) + Number(this.socio.precioConsumo);
                      this.factReunion(this.total, item);
                      this.cargando = false;
                      // Convertir numeros a letras
                      // this.letras = covertirNumLetras(String(this.total));
                      this.mostraDirectivoMayor = false;
                    })
                }
              }

            },
              err => {
                console.log(err);

              }
            );
        }
      });
  }


  /**
   * factReunion
   */
  public factReunion(total: number, idFactura: number) {
    this.facturaServices.showFacturaReunion(idFactura)
      .subscribe(({ facturaReunion }) => {
        // console.log(facturaReunion);
        if (facturaReunion.length === 0) {
          this.facturaReunion = [];
          this.letras = covertirNumLetras(String(total));
        } else {
          this.facturaReunion = facturaReunion;
          facturaReunion.forEach((element: any) => {
            total = total + Number(element.precio);
            // console.log(this.total);
          });
          this.total = Number(total);
          this.letras = covertirNumLetras(String(total));
        }
      })
  }

  /**
   * crearPDF
   */
  public crearPDF() {

    this.router.navigate(['/dashboard/factpagadas']);


  }

}