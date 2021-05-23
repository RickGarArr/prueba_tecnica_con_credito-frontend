import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';

import { CrearProspectoPage } from './crear_prospecto/crear_prospecto.page';
import { ListaProspectosPage } from './lista_prospectos/lista_prospectos.page';
import { HomePage } from './home/home.page';
import { DetallesProspectoPage } from './detalles_prospecto/detalles_prospecto.page';
import { FourOFourPage } from './FourOFour/FourOFour.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule
    ],
    declarations: [
        CrearProspectoPage,
        HomePage,
        ListaProspectosPage,
        DetallesProspectoPage,
        FourOFourPage
    ],
    exports: [

    ]
})
export class PagesModule {}