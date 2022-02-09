
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

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public socio: any;
  public detalle: any;
  public total: any;
  public idFactura: any;


  // loading
  public cargando: boolean = true;

  public fecha: any;

  constructor(
    private facturaServices: FacturaService,
    private rutaActiva: ActivatedRoute,
    private dataServices: DataService,
    private router: Router
  ) {
    // Recibiendo el parametro
    this.idFactura = this.rutaActiva.snapshot.params.id;
    this.showFacturas(this.idFactura);
  }

  ngOnInit(): void {

    // Fecha actual
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    this.fecha = hoy.toDateString(); // "Sun Jun 14 2020"
    // console.log(this.fecha);

  }

  /**
   * cancelar
   */
  public cancelar() {
    this.dataServices.idSocio$.emit(this.socio.idSocio);
    this.router.navigate(['/dashboard/facturas']);

  }

  /**
   * showFacturas
   */
  public showFacturas(item: number) {
    // console.log(item);

    this.facturaServices.showFacturas(item)
      .subscribe(({ detalle }) => {
        let suma = 0;
        // console.log(detalle);
        if (detalle.length != 0) {
          this.socio = detalle[0];
          this.detalle = detalle;
          detalle.forEach((element: any) => {
            suma = suma + (element.precioDetalle)
          });
          this.total = suma + this.socio.retraso + this.socio.precioConsumo;
          this.cargando = false;
        } else {
          this.facturaServices.retrasoFactura(item)
            .subscribe(({ factura }) => {
              // console.log(factura);
              this.socio = factura[0];
              this.total = this.socio.retraso + this.socio.precioConsumo;
              this.cargando = false;
            })
        }

      });
  }

  /**
   * crearPDF
   */
  public crearPDF() {



    const formData = {
      total_pagado: this.total,
      fecha_emision: this.fecha,
      estado_pago: 1
    }

    this.facturaServices.updateFactura(formData, this.idFactura)
      .subscribe(({ changesFactura }) => {
        // console.log(changesFactura);
        this.router.navigate(['/dashboard/facturas']);
      });


    // Para auto imprimir
    // doc.autoPrint();
    // doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
  }
}