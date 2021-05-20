import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';

import { CrearProspectoPage } from './crear_prospecto/crear_prospecto.page';
import { EvaluacionProspectoPage } from './evaluacion_prospecto/evaluacion_prospecto.page';
import { ListaProspectosPage } from './lista_prospectos/lista_prospectos.page';
import { HomePage } from './home/home.page';
import { DetallesProspectoPage } from './detalles_prospecto/detalles_prospecto.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule
    ],
    declarations: [
        CrearProspectoPage,
        EvaluacionProspectoPage,
        HomePage,
        ListaProspectosPage,
        DetallesProspectoPage
    ],
    exports: [

    ]
})
export class PagesModule {}