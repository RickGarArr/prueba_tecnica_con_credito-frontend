import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFile, IProspecto } from 'src/app/interfaces/globales';
import { AlertsService } from 'src/app/services/alerts.service';
import { BackendService } from 'src/app/services/backend.service';
import { UIService } from 'src/app/services/ui.service';

const { minLength, required, pattern, maxLength } = Validators;

@Component({
    selector: 'detalles-prospecto-page',
    templateUrl: './detalles_prospecto.page.html',
    styleUrls: ['./detalles_prospecto.page.css']
})
export class DetallesProspectoPage implements OnInit, OnDestroy {

    public prospecto: IProspecto = undefined;
    public files: IFile[] = [];
    public evaluacionValue = undefined;
    public method: string;
    public id: string;

    private cancelButonSubs: Subscription;
    private getProspectoSubs: Subscription;

    constructor(private router: Router,
        private uiService: UIService,
        private activatedRoute: ActivatedRoute,
        private backendService: BackendService,
        public alertService: AlertsService
    ) {
        this.activatedRoute.params.subscribe(({ id, method }: { id: string, method: string }) => {
            this.method = method;
            this.id = id;
        });
    }


    ngOnInit(): void {
        this.alertService.showLoadingAlert('Buscando informacion del prospecto...');
        this.getProspectoSubs = this.backendService.getProspecto(this.id).subscribe(({ prospecto }: { prospecto: IProspecto }) => {
            const { estatus, observaciones, files, ...prospectoDB } = prospecto;
            this.prospecto = prospectoDB;
            this.files = [...files];
            this.evaluacionValue = { estatus, observaciones };
            this.alertService.closeAlert();
        }, ({ error }: HttpErrorResponse) => {
            this.alertService.closeAlert();
            this.alertService.showErrorAlert(error.errors[0]).then(() => {
                this.router.navigate(['/prospectos']);
            });
        });

        this.cancelButonSubs = this.uiService.CancelButtonObservable.subscribe(() => {
            this.router.navigate(['/prospectos']);
        });
    }

    fetchFile(filename) {
        this.backendService.getProspectoFile(this.prospecto.id, filename).then((response) => {
            console.log(response.url);
            return response.blob();
        }).then((file) => {
            let objectURL = URL.createObjectURL(file);
            (document.querySelector('#pdf-frame') as HTMLMediaElement).src = '';
            (document.querySelector('#pdf-frame') as HTMLMediaElement).src = objectURL;
            // objectURL = URL.revokeObjectURL(file);
        }).then(
            function () {
                window.setTimeout(function () {
                    (document.querySelector('#pdf-frame') as any).contentWindow.print();
                }, 1000)
            });
    }

    ngOnDestroy(): void {
        this.cancelButonSubs.unsubscribe();
        this.getProspectoSubs.unsubscribe();
    }

}