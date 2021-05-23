import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  public route: string;
  @ViewChild('toolbar') toolbar: ElementRef;
  @ViewChild('capturar_buttons') capturar_buttons: ElementRef;
  @ViewChild('search_div') search_div: ElementRef;
  @ViewChild('select_estatus') select_estatus: ElementRef;
  @ViewChild('guardar') guardarButton: ElementRef;
  @ViewChild('cancelar') cancelarButton: ElementRef;

  constructor(private router: Router, private uiService: UIService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/home':
          case '/':
            this.toolbar.nativeElement.style.display = "none";
            break;
          case '/prospectos':
            this.search_div.nativeElement.style.display = "flex";
            this.toolbar.nativeElement.style.display = "flex";
            this.guardarButton.nativeElement.style.display = "none";
            this.cancelarButton.nativeElement.innerText = "volver";
            break;
          case '/capturar':
            this.toolbar.nativeElement.style.display = "flex";
            this.cancelarButton.nativeElement.innerText = "cancelar";
            this.search_div.nativeElement.style.display = "none";
            this.guardarButton.nativeElement.style.display = "inline-block";
            break;
          default:
            if (event.url.includes('evaluar')) {
              this.search_div.nativeElement.style.display = "none";
              this.cancelarButton.nativeElement.innerText = "cancelar";
              this.guardarButton.nativeElement.style.display = "inline-block";
            } else if (event.url.includes('verdetalles')) {
              this.search_div.nativeElement.style.display = "none";
              this.guardarButton.nativeElement.style.display = "none";
              this.cancelarButton.nativeElement.innerText = "volver";
            } else {
              this.toolbar.nativeElement.style.display = "none"
            }
            // this.toolbar.nativeElement.style.display = "flex";
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.uiService.SaveButtonObservable = fromEvent(this.guardarButton.nativeElement, 'click');
    this.uiService.CancelButtonObservable = fromEvent(this.cancelarButton.nativeElement, 'click');
    this.uiService.toolbar_select = fromEvent(this.select_estatus.nativeElement, 'change');
  }

}
