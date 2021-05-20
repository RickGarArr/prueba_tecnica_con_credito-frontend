import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-prospecto-item',
  templateUrl: './prospecto-item.component.html',
  styleUrls: ['./prospecto-item.component.css']
})
export class ProspectoItemComponent implements AfterViewInit {

  @Input() type: "enviado" | "autorizado" | "rechazado";
  @ViewChild('list_item') list_item: ElementRef;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.list_item.nativeElement.classList.add(this.type);
  }

  verDetalles() {
    this.router.navigate(['/prospectos', '15ASO5V/v']);
  }

}
