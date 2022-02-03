
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
    console.log(this.fecha);

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
    this.facturaServices.showFacturas(item)
      .subscribe(({ detalle }) => {
        let suma = 0;
        // console.log(detalle);
        this.socio = detalle[0];
        this.detalle = detalle;
        detalle.forEach((element: any) => {
          suma = suma + (element.precioDetalle)
        });
        this.total = suma + this.socio.retraso + this.socio.precioConsumo;
        this.cargando = false;
      });
  }

  /**
   * crearPDF
   */
  public crearPDF() {
    // const doc = new jsPDF();

    // doc.text('Hello world!', 10, 10);
    // doc.setFontSize(10);
    // doc.text('Recibo de venta de orquídeas', 10, 30);
    // doc.text('Comprobante No.: 7854214587', 10, 35);
    // doc.text('PDV: Pedro Pérez', 10, 40);
    // doc.text('Operador: 123654', 10, 45);
    // doc.text('Especie vendida: Sophronitis coccinea', 10, 55);
    // doc.text('Valor: 35.00', 10, 60);
    // doc.text('TBX: 242985290', 10, 65);
    // doc.text('Fecha/Hora: 2019-11-05 12:28:21', 10, 70);
    // doc.text('_______________________________', 10, 90);
    // doc.text('Recibí conforme', 10, 95);
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.autoPrint();
      docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
      // docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });

    // Para auto imprimir
    // doc.autoPrint();
    // doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
  }
}