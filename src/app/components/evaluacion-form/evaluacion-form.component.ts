import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-evaluacion-form',
  templateUrl: './evaluacion-form.component.html',
  styleUrls: ['./evaluacion-form.component.css']
})
export class EvaluacionFormComponent implements OnInit, OnDestroy {

  @Input() evaluacionValue = undefined;
  @Input() method: string;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  private guardarButtonSubs: Subscription;
  public evaluacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private uiService: UIService) {
    this.evaluacionForm = this.formBuilder.group({
      estatus: new FormControl('enviado', [Validators.required]),
      observaciones: new FormControl('')
    });
  }


  ngOnInit(): void {
    if (this.method == "verdetalles") this.evaluacionForm.disable();

    this.evaluacionForm.reset({
      estatus: this.evaluacionValue?.estatus,
      observaciones: this.evaluacionValue?.observaciones
    });

    this.guardarButtonSubs = this.uiService.SaveButtonObservable.subscribe(() => {
      switch (this.evaluacionForm.controls['estatus'].value) {
        case 'enviado':
          this.onSubmit.emit(undefined);
          break;
        case 'rechazado':
          if (!this.evaluacionForm.controls['observaciones'].value || this.evaluacionForm.controls['observaciones'].value?.trim() == "") {
            this.onSubmit.emit(undefined);
          } else {
            this.onSubmit.emit(this.evaluacionForm.value);
          }
          break;
        case 'autorizado':
          const { estatus } = this.evaluacionForm.value;
          this.onSubmit.emit({ estatus });
      }
    });
  }

  ngOnDestroy(): void {
    this.guardarButtonSubs.unsubscribe();
  }

}
