import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProspecto } from 'src/app/interfaces/globales';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-prospecto-item',
  templateUrl: './prospecto-item.component.html',
  styleUrls: ['./prospecto-item.component.css']
})
export class ProspectoItemComponent implements OnInit, AfterViewInit {

  @Input() prospecto: IProspecto = undefined;
  public isEnviado: boolean = false;
  public isAutorizado: boolean = false;
  public isRechazado: boolean = false;

  @ViewChild('list_item') list_item: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    switch (this.prospecto.estatus.toLowerCase()) {
      case 'autorizado': this.isEnviado = true; break;
      case 'rechazado': this.isEnviado = true; break;
      case 'enviado': this.isEnviado = true; break;
      default: this.isEnviado = true;
    }
  }

  ngAfterViewInit() {
    this.list_item.nativeElement.classList.add(this.prospecto.estatus.toLowerCase());
  }

  verDetalles() {
    this.router.navigate(['/prospectos', 'verdetalles', this.prospecto.id]);
  }

  evaluar() {
    this.router.navigate(['/prospectos', 'evaluar', this.prospecto.id]);
  }

}
