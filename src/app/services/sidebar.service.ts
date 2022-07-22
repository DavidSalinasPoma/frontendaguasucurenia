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
        { titulo: 'Principal', url: '/' },
        { titulo: 'Reportes', url: 'reportes' },
        // { titulo: 'ProgressBar', url: 'progress' },
        // { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
    {
      titulo: 'Facturación',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'Cobrar factura', url: 'facturas' },
        { titulo: 'Facturas pagadas', url: 'factpagadas' },
      ]
    },
    {
      titulo: 'Cunsumo',
      icono: 'mdi mdi-chart-line',
      submenu: [
        { titulo: 'Lectura consumos', url: 'consumos' },
      ]
    },
    {
      titulo: 'RR. HH.',
      icono: 'mdi mdi-account-multiple-plus',
      submenu: [
        { titulo: 'Socios', url: 'socios' },
        { titulo: 'Personas', url: 'personas' },
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
    {
      titulo: 'Reuniones',
      icono: 'mdi mdi-account-box',
      submenu: [
        { titulo: 'Crear reuniones', url: 'reuniones' },
        { titulo: 'Lista de reuniones', url: 'listaReunion' },
        { titulo: 'Modificar opción', url: 'modificarReunion' }
      ]
    },
    {
      titulo: 'Directorio',
      icono: 'mdi mdi-format-list-bulleted',
      submenu: [
        { titulo: 'Lista directorio', url: 'directivos' }
      ]
    },
    {
      titulo: 'Configuraciónes',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Permiso', url: 'permisos' },
        { titulo: 'Roles', url: 'roles' },
        { titulo: 'Usuarios', url: 'usuarios' },
      ]
    },

  ];

  constructor() { }
}
