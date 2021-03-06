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
            formdata.append(key, value.trim().toLowerCase());
        });
        files?.forEach(({file, nombre}) => {
            const undescoreName = file.name.trim().replace(/ /g, "_");
            formdata.append(nombre.trim().toLowerCase(), file, undescoreName);
        });
        return this.http.post(`${base_url}/prospecto`, formdata);
    }

    public getProspectos(estatus = '', page = '', nombre = '') {
        return this.http.get(`${base_url}/prospectos?page=${page}&estatus=${estatus}&nombre=${nombre}`)
        .pipe(tap(({ prospectos }: { total: number, prospectos: IProspecto[] }) => {
            this.prospectos = [...prospectos];
        }));
    }

    public getProspecto(id: string) {
        return this.http.get(`${base_url}/prospecto/${id}`);
    }

    public evaluarProspecto(id: string, evaluacion: {estatus: string, observaciones: string}) {
        return this.http.put(`${base_url}/prospecto/evaluar/${id}`, evaluacion);
    }

    public getProspectoFile(id: string, filename: string) {
        return fetch(`${base_url}/file/${id}/${filename}`);
    }
}