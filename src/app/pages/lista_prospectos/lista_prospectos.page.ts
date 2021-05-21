import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProspecto } from 'src/app/interfaces/globales';
import { AlertsService } from 'src/app/services/alerts.service';
import { BackendService } from 'src/app/services/backend.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
    selector: 'lista-prospectos-page',
    templateUrl: './lista_prospectos.page.html',
    styleUrls: ['./lista_prospectos.page.css']
})
export class ListaProspectosPage implements OnInit, OnDestroy {

    public prospectos: IProspecto[] = [];
    private cancelClickSub: Subscription;
    private onlyEvaluados: boolean = false;

    constructor(private router: Router,
        private uiService: UIService,
        private backendService: BackendService,
        private alertService: AlertsService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe(querys => {
            this.onlyEvaluados = querys.evaluados;
        });
    }

    ngOnInit(): void {
        this.alertService.showLoadingAlert('Buscando información de los prospectos');
        this.cancelClickSub = this.uiService.CancelButtonObservable.subscribe(() => {
            this.router.navigate(['/home']);
        });
        this.backendService.getProspectos(this.onlyEvaluados).subscribe(({ total, prospectos }: { total: number, prospectos: IProspecto[] }) => {
            this.prospectos = [...prospectos];
            this.alertService.closeAlert();
        });
    }

    ngOnDestroy(): void {
        this.cancelClickSub.unsubscribe();
    }
}