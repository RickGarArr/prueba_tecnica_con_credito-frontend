import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, ViewRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormControlName, FormGroup, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;
  @ViewChild('label') label: ElementRef;

  @Input() labelText: string = 'S/N';
  @Input() inputType: string = 'text';
  @Input() inputName: string = 'sin_name';
  @Input() inputId: string = 'sin_id';
  @Input() placeholder: string = '';
  @Input() control: FormControl;
  @Input() errorMsg: string = "";

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.input.nativeElement.addEventListener('focus', () => {
      this.label.nativeElement.classList.add('focus');
    });

    this.input.nativeElement.addEventListener('keyup', () => {
      this.control.setValue(this.input.nativeElement.value.toUpperCase());
    });

    if(this.control.value) {
      this.label.nativeElement.classList.add('focus');
      this.label.nativeElement.classList.add('pristine');
    }

    this.input.nativeElement.addEventListener('blur', () => {
      if (!this.input.nativeElement.value) {
        this.label.nativeElement.classList.remove('focus');
        this.label.nativeElement.classList.remove('invalid');
        this.label.nativeElement.classList.remove('valid');
        this.control.markAsPristine();
      } else {
        if (this.input.nativeElement.classList.contains('ng-dirty') && (this.input.nativeElement.classList.contains('ng-valid'))) {
          this.label.nativeElement.classList.remove('invalid');
          this.label.nativeElement.classList.add('valid');
        } else {
          this.label.nativeElement.classList.remove('valid');
          this.label.nativeElement.classList.add('invalid');
        }
      }
    });
  }

}
