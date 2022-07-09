import { ModificarReunionComponent } from './reuniones/modificar-reunion/modificar-reunion.component';
import { SocionocobroComponent } from './reportes/socionocobro/socionocobro.component';
import { SociocobroComponent } from './reportes/sociocobro/sociocobro.component';
import { DetallereunionesComponent } from './reuniones/detallereuniones/detallereuniones.component';
import { SociogeneralComponent } from './reportes/sociogeneral/sociogeneral.component';
import { SocioxbarrioComponent } from './reportes/socioxbarrio/socioxbarrio.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PersonasComponent } from './recursoshumanos/personas/personas.component';
import { CrearPersonaComponent } from './recursoshumanos/personas/crear-persona/crear-persona.component';
import { UsuariosComponent } from './recursoshumanos/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './recursoshumanos/usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './recursoshumanos/usuarios/editar-usuarios/editar-usuarios.component';
import { EventosComponent } from './cobros/eventos/eventos.component';
import { CrearEventosComponent } from './cobros/eventos/crear-eventos/crear-eventos.component';
import { EditarEventosComponent } from './cobros/eventos/editar-eventos/editar-eventos.component';
import { ServiciosComponent } from './cobros/servicios/servicios.component';
import { CrearServiciosComponent } from './cobros/servicios/crear-servicios/crear-servicios.component';
import { EditarServiciosComponent } from './cobros/servicios/editar-servicios/editar-servicios.component';
import { BarriosComponent } from './recursoshumanos/barrios/barrios.component';
import { CrearBarrioComponent } from './recursoshumanos/barrios/crear-barrio/crear-barrio.component';
import { EditarBarrioComponent } from './recursoshumanos/barrios/editar-barrio/editar-barrio.component';
import { EditarPersonaComponent } from './recursoshumanos/personas/editar-persona/editar-persona.component';
import { SociosComponent } from './recursoshumanos/socios/socios.component';
import { EditarSocioComponent } from './recursoshumanos/socios/editar-socio/editar-socio.component';
import { CrearSocioComponent } from './recursoshumanos/socios/crear-socio/crear-socio.component';
import { ConsumoComponent } from './consumos/consumo/consumo.component';
import { LecturaComponent } from './consumos/lectura/lectura.component';
import { FacturaComponent } from './factura/factura.component';
import { DetalleComponent } from './factura/detalle/detalle.component';
import { FacturapagadasComponent } from './factura/facturapagadas/facturapagadas.component';
import { DetallepagadasComponent } from './factura/detallepagadas/detallepagadas.component';
import { ListaDirectivosComponent } from './directivo/lista-directivos/lista-directivos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearReunionesComponent } from './reuniones/crear-reuniones/crear-reuniones.component';
import { ListaReunionesComponent } from './reuniones/lista-reuniones/lista-reuniones.component';
import { CobroxmesComponent } from './reportes/cobroxmes/cobroxmes.component';
import { ListamultasComponent } from './reuniones/listamultas/listamultas.component';
import { ModalDeudoresComponent } from './reportes/socionocobro/modal-deudores/modal-deudores.component';

const childRoute: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Panel principal - Dashboard' } }, // Path inicial
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica' } },

  // Recursos humanos
  { path: 'personas', component: PersonasComponent, data: { titulo: 'Lista de personas registradas' } },
  { path: 'crearpersonas', component: CrearPersonaComponent, data: { titulo: 'Registro de personas' } },
  { path: 'editarpersonas/:id', component: EditarPersonaComponent, data: { titulo: 'Modificar Persona' } },

  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios del sistema' } },
  { path: 'crearusuarios', component: CrearUsuariosComponent, data: { titulo: 'Registro de usuarios del sistema' } },
  { path: 'editarusuarios/:id', component: EditarUsuariosComponent, data: { titulo: 'Modificar Usuario' } },

  // Eventos y servicios
  { path: 'eventos', component: EventosComponent, data: { titulo: 'Eventos' } },
  { path: 'creareventos', component: CrearEventosComponent, data: { titulo: 'Registrar Eventos' } },
  { path: 'editareventos/:id', component: EditarEventosComponent, data: { titulo: 'Modificar evento' } },

  { path: 'servicios', component: ServiciosComponent, data: { titulo: 'Servicios' } },
  { path: 'crearservicios', component: CrearServiciosComponent, data: { titulo: 'Registro de Servicios' } },
  { path: 'editarservicios/:id', component: EditarServiciosComponent, data: { titulo: 'Modificar Servicios' } },

  { path: 'barrios', component: BarriosComponent, data: { titulo: 'Barrios' } },
  { path: 'crearbarrios', component: CrearBarrioComponent, data: { titulo: 'Registro de Barrios' } },
  { path: 'editarbarrios/:id', component: EditarBarrioComponent, data: { titulo: 'Modificar Barrios' } },

  { path: 'socios', component: SociosComponent, data: { titulo: 'Socios' } },
  { path: 'crearsocios', component: CrearSocioComponent, data: { titulo: 'Registro de Socios' } },
  { path: 'editarsocios/:id', component: EditarSocioComponent, data: { titulo: 'Modificar Socios' } },

  { path: 'consumos', component: ConsumoComponent, data: { titulo: 'Consumo de agua potable' } },
  { path: 'lecturas/:id', component: LecturaComponent, data: { titulo: 'Lectura medidor' } },

  { path: 'facturas', component: FacturaComponent, data: { titulo: 'Sistema de Facturas' } },

  { path: 'detalles/:id', component: DetalleComponent, data: { titulo: 'Factura detalle' } },

  { path: 'factpagadas', component: FacturapagadasComponent, data: { titulo: 'Facturas pagadas' } },

  { path: 'detallespagadas/:id', component: DetallepagadasComponent, data: { titulo: 'Reporte de Factura Pagada' } },

  { path: 'directivos', component: ListaDirectivosComponent, data: { titulo: 'Lista del directorio actual' } },

  { path: 'reportes', component: ReportesComponent, data: { titulo: 'Reportes' } },

  { path: 'reportexbarrio', component: SocioxbarrioComponent, data: { titulo: 'Reportes socio por barrio' } },

  { path: 'reuniones', component: CrearReunionesComponent, data: { titulo: 'Reuniones' } },

  { path: 'listaReunion', component: ListaReunionesComponent, data: { titulo: 'Lista de reuniones' } },

  { path: 'detalleReunion/:id', component: DetallereunionesComponent, data: { titulo: 'Registro de reuniones por socio' } },

  { path: 'modificarReunion', component: ModificarReunionComponent, data: { titulo: 'Modificar opción de reunión' } },

  { path: 'reportemultas/:id', component: ListamultasComponent, data: { titulo: 'Reporte de multas de reunión' } },

  { path: 'reportegeneral', component: SociogeneralComponent, data: { titulo: 'Reporte de general de socios' } },

  { path: 'cobroxmes', component: CobroxmesComponent, data: { titulo: 'Reporte cobros por mes' } },

  { path: 'cobrosocio', component: SociocobroComponent, data: { titulo: 'Reporte de Cobro Por Mes al Detalle' } },

  { path: 'cobronosocio', component: SocionocobroComponent, data: { titulo: 'Reporte socios que no pagaron' } },

  { path: 'modalDeudores/:id', component: ModalDeudoresComponent, data: { titulo: 'Lista de deudas' } },


  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(childRoute)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
