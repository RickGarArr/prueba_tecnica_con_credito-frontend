import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormControlComponent } from './form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProspectoItemComponent } from './prospecto-item/prospecto-item.component';
import { RouterModule } from '@angular/router';
import { FormularioProspectoComponent } from './formulario-prospecto/formulario-prospecto.component';
import { EvaluacionFormComponent } from './evaluacion-form/evaluacion-form.component';
import { DocumentsViewComponent } from './documents-view/documents-view.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    FormControlComponent,
    ProspectoItemComponent,
    FormularioProspectoComponent,
    EvaluacionFormComponent,
    DocumentsViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    FormControlComponent,
    ProspectoItemComponent,
    FormularioProspectoComponent,
    EvaluacionFormComponent,
    DocumentsViewComponent
  ]
})
export class ComponentsModule { }
