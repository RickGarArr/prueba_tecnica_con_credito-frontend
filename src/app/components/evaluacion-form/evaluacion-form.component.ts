import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-evaluacion-form',
  templateUrl: './evaluacion-form.component.html',
  styleUrls: ['./evaluacion-form.component.css']
})
export class EvaluacionFormComponent implements OnInit, OnDestroy{

  @Input() evaluacionValue = undefined;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  private guardarButtonSubs: Subscription;
  public evaluacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private uiService: UIService) {
    this.evaluacionForm = this.formBuilder.group({
      estatus: new FormControl('enviado', [Validators.required]),
      observaciones: new FormControl('', [Validators.required])
    });
  }

  
  ngOnInit(): void {
    this.evaluacionForm.reset({
      estatus: this.evaluacionValue?.estatus,
      observaciones: this.evaluacionValue?.observaciones
    });
    
    this.guardarButtonSubs = this.uiService.SaveButtonObservable.subscribe(() => {
      if (this.evaluacionForm.invalid) {
        this.onSubmit.emit(undefined);
      } else {
        this.onSubmit.emit(this.evaluacionForm.value);
      }
    });
  }

  ngOnDestroy(): void {
    this.guardarButtonSubs.unsubscribe();
  }
  
}
