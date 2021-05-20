import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UIService {
    public SaveButtonObservable: Observable<any>;
    public CancelButtonObservable: Observable<any>;
}