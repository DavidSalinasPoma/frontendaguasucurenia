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
      titulo: 'Cunsumo',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Crear comsumo', url: 'servicio' },
        { titulo: 'ver todo', url: 'lista' },
      ]
    },
    {
      titulo: 'RR. HH.',
      icono: 'mdi mdi-account-multiple-plus',
      submenu: [
        { titulo: 'Personas', url: 'personas' },
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Socios', url: 'socios' },
        { titulo: 'Empleados', url: 'empleados' },
        { titulo: 'Barrio', url: 'barrios' },
      ]
    },
    {
      titulo: 'Facturación',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Factura', url: 'factura' },
        { titulo: 'Detalle', url: 'detalle' },
      ]
    },
    {
      titulo: 'Eventos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Crear evento', url: 'evento' },
        { titulo: 'ver todo', url: 'lista' },
      ]
    },
    {
      titulo: 'Servicios',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Crear servicio', url: 'servicio' },
        { titulo: 'ver todo', url: 'lista' },
      ]
    }

  ];

  constructor() { }
}
