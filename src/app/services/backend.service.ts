import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProspecto } from '../interfaces/globales';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public prospectos: IProspecto[] = [];

    constructor(private http: HttpClient) {

    }

    public postProspecto(prospecto: IProspecto) {
        const { files, ...formProspecto } = prospecto;
        const formdata = new FormData();
        Object.entries(formProspecto).forEach(([key, value]) => {
            formdata.append(key, value);
        });
        files.forEach((file: any) =>{
            formdata.append(file.nombre, file.file, file.file.name);
        });
        return this.http.post(`${base_url}/prospecto`, formdata);
    }

    public getProspectos(onlyEvaluados?: boolean) {
        let observer = undefined;
        if (onlyEvaluados) {
            observer = this.http.get(`${base_url}/prospectos`, { params: { evaluados: "true" } });
        } else {
            observer = this.http.get(`${base_url}/prospectos`);
        }
        return observer.pipe(tap( ({prospectos}: {total: number, prospectos: IProspecto[]}) => {
            this.prospectos = [...prospectos];
        }));
    }

    public getProspecto(id: string) {
        return this.http.get(`${base_url}/prospecto/${id}`);
    }
}