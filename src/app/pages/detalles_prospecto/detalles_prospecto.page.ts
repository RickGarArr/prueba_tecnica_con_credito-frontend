import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { UIService } from 'src/app/services/ui.service';

const { minLength, required, pattern, maxLength } = Validators;

@Component({
    selector: 'detalles-prospecto-page',
    templateUrl: './detalles_prospecto.page.html',
    styleUrls: ['./detalles_prospecto.page.css']
})
export class DetallesProspectoPage implements OnInit, OnDestroy {

    private cancelButonSub: Subscription;

    constructor(private router: Router, private uiService: UIService) {

    }

    ngOnInit(): void {
        this.cancelButonSub = this.uiService.CancelButtonObservable.subscribe(() => {
            this.router.navigate(['/prospectos']);
        });
    }

    ngOnDestroy(): void {
        this.cancelButonSub.unsubscribe();
    }

}