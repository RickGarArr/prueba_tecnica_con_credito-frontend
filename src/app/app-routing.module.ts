import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//pages
import { HomePage } from './pages/home/home.page';
import { CrearProspectoPage } from './pages/crear_prospecto/crear_prospecto.page';
import { ListaProspectosPage } from './pages/lista_prospectos/lista_prospectos.page';
import { FourOFourPage } from './pages/FourOFour/FourOFour.page';
import { DetallesProspectoPage } from './pages/detalles_prospecto/detalles_prospecto.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'capturar',
    component: CrearProspectoPage
  },
  {
    path: 'prospectos',
    component: ListaProspectosPage
  },
  {
    path: 'prospectos/:method/:id',
    component: DetallesProspectoPage
  },
  {
    path: '*',
    component: FourOFourPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
