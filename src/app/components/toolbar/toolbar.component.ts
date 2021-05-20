import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertsService } from 'src/app/services/alerts.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  public route: string;
  @ViewChild('capturar_buttons') capturar_buttons: ElementRef;
  @ViewChild('guardar') guardarButton: ElementRef;
  @ViewChild('cancelar') cancelarButton: ElementRef;

  constructor(private router: Router, private uiService: UIService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/home':
            this.capturar_buttons.nativeElement.style.display = 'none';
            break;
          case '/capturar':
            this.capturar_buttons.nativeElement.style.display = 'block';
            this.cancelarButton.nativeElement.innerText = "cancelar";
            this.guardarButton.nativeElement.style.display = "inline-block";
            break;
          case '/prospectos':
            this.capturar_buttons.nativeElement.style.display = 'block';
            this.cancelarButton.nativeElement.innerText = "Volver";
            this.guardarButton.nativeElement.style.display = 'none';
            break;
          default:
            this.capturar_buttons.nativeElement.style.display = 'block';
            this.guardarButton.nativeElement.style.display = 'none';
            this.cancelarButton.nativeElement.style.display = "inline-block";
            this.cancelarButton.nativeElement.innerText = "Volver";
            break;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.uiService.SaveButtonObservable = fromEvent(this.guardarButton.nativeElement, 'click');
    this.uiService.CancelButtonObservable = fromEvent(this.cancelarButton.nativeElement, 'click');
  }

}
