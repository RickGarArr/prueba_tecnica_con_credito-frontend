import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-form',
  templateUrl: './evaluacion-form.component.html',
  styleUrls: ['./evaluacion-form.component.css']
})
export class EvaluacionFormComponent implements OnInit {

  @Input() evaluacionValue = undefined;
  public evaluacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.evaluacionForm = this.formBuilder.group({
      estatus: new FormControl(''),
      observaciones: new FormControl('')
    });
  }

  ngOnInit(): void {  
    this.evaluacionForm.reset({
      estatus: this.evaluacionValue?.estatus,
      observaciones: this.evaluacionValue?.observaciones
    });
  }

}
