import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { UIService } from 'src/app/services/ui.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProspecto } from 'src/app/interfaces/globales';

const { required, minLength, maxLength } = Validators;

@Component({
    selector: 'app-formulario-prospecto',
    templateUrl: './formulario-prospecto.component.html',
    styleUrls: ['./formulario-prospecto.component.css']
})
export class FormularioProspectoComponent implements OnInit, OnDestroy {

    @Input() method: string = "";
    @Input() prospecto: IProspecto;
    @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

    private guardarButtonSub: Subscription;

    public capturarForm: FormGroup;

    constructor(private fb: FormBuilder, private uiService: UIService, private alertService: AlertsService) {
        this.capturarForm = this.fb.group({
            nombre: new FormControl('', [required, minLength(2)]),
            apellido_pat: new FormControl('', [required, minLength(2)]),
            apellido_mat: new FormControl(''),
            calle: new FormControl('', [required, minLength(2)]),
            numero: new FormControl('', [required, minLength(1), maxLength(5)]),
            colonia: new FormControl('', [required, minLength(2)]),
            codigo_postal: new FormControl('', [required, minLength(4), maxLength(5)]),
            telefono: new FormControl('', [required, minLength(10), maxLength(12)]),
            rfc: new FormControl('', [required, minLength(12), maxLength(14)]),
            files: new FormArray([])
        }, { updateOn: 'blur' });
    }

    ngOnInit(): void {
        if (this.method === "capturar") {
            this.guardarButtonSub = this.uiService.SaveButtonObservable.subscribe(() => {
                if (this.capturarForm.invalid) {
                    this.alertService.showErrorAlert('La información no está completa');
                    this.markAsDirty(this.capturarForm.controls);
                } else {
                    this.alertService.showConfirmAlert('¿la inforación es correcta?', '¿Está Seguro?').then(result => {
                        if (result.isConfirmed) {
                            this.onSubmitForm.emit(this.capturarForm.value);
                        }
                    });
                }
            });
        }

        if(this.prospecto) {
            this.capturarForm.disable();
            this.capturarForm.reset(this.prospecto);
        }
    }

    ngOnDestroy() {
        this.guardarButtonSub.unsubscribe();
    }

    public get filesControls() {
        return this.capturarForm.get('files') as FormArray;
    }

    public get formControls() {
        return this.capturarForm.controls;
    }

    eliminarControl(i) {
        this.filesControls.removeAt(i);
    }

    setFile(i, {target: {files: [file]}}) {
        (this.filesControls.controls[i] as FormGroup).controls['file'].setValue(file);
    }

    agregarFilesControl() {
        const fileControl = this.fb.group({
            nombre: new FormControl('', [required]),
            file: new FormControl('')
        });
        this.filesControls.push(fileControl);
        console.log(this.filesControls.controls);
    }

    private markAsDirty(controls: Object) {
        Object.values(controls).forEach(control => {
            if (control instanceof FormControl) {
                control.markAsDirty();
            }
            if (control instanceof FormArray) {
                this.markAsDirty(control.controls);
            }
            if (control instanceof FormGroup) {
                this.markAsDirty(control.controls);
            }
        });
    }

}
