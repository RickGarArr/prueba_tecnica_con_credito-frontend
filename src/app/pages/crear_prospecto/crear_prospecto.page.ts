import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { UIService } from 'src/app/services/ui.service';

const { minLength, required, pattern, maxLength } = Validators;

@Component({
    selector: 'crear-prospecto-page',
    templateUrl: './crear_prospecto.page.html',
    styleUrls: ['./crear_prospecto.page.css']
})
export class CrearProspectoPage implements OnInit, OnDestroy {

    private cancelClickSubs: Subscription;

    constructor(private uiService: UIService, private alertService: AlertsService, private router: Router) {
    }

    ngOnInit(): void {
        this.cancelClickSubs = this.uiService.CancelButtonObservable.subscribe(() => {
            this.alertService.showDangerAlert('Se perderá toda la información', '¿Continuar?').then(result => {
                if (result.isConfirmed) {
                    this.router.navigate(['/home']);
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.cancelClickSubs.unsubscribe();
    }
    
    submitForm(event) {
        console.log(event);
        
    }
}