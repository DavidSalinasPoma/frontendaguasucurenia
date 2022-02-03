import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
    {
      titulo: 'Facturación',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Cobrar factura', url: 'facturas' },
      ]
    },
    {
      titulo: 'Cunsumo',
      icono: 'mdi mdi-chart-line',
      submenu: [
        { titulo: 'Consumo', url: 'consumos' },
      ]
    },
    {
      titulo: 'RR. HH.',
      icono: 'mdi mdi-account-multiple-plus',
      submenu: [
        { titulo: 'Personas', url: 'personas' },
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Socios', url: 'socios' },
        // { titulo: 'Empleados', url: 'empleados' },
        { titulo: 'Barrio', url: 'barrios' },
      ]
    },

    {
      titulo: 'Eventos y servicios',
      icono: 'mdi mdi-clipboard-text',
      submenu: [
        { titulo: 'Eventos', url: 'eventos' },
        { titulo: 'Servicios', url: 'servicios' },
      ]
    },
    // {
    //   titulo: 'Apertura',
    //   icono: 'mdi  mdi-chart-arc',
    //   submenu: [
    //     { titulo: 'Apertura', url: 'aperturas' }
    //   ]
    // },
  ];

  constructor() { }
}
