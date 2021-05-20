import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
    selector: 'lista-prospectos-page',
    templateUrl: './lista_prospectos.page.html',
    styleUrls: ['./lista_prospectos.page.css']
})
export class ListaProspectosPage implements OnInit, OnDestroy {

    private cancelClickSub: Subscription;

    constructor(private router: Router, private uiService: UIService) { }
    
    ngOnInit(): void {
        this.cancelClickSub = this.uiService.CancelButtonObservable.subscribe(() => {
            this.router.navigate(['/home']);
        });
    }

    ngOnDestroy(): void {
        this.cancelClickSub.unsubscribe();
    }
}