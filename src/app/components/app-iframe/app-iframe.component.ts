import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare const disableScroll: Function;
declare const enableScroll: Function;

@Component({
  selector: 'app-app-iframe',
  templateUrl: './app-iframe.component.html',
  styleUrls: ['./app-iframe.component.css']
})
export class AppIframeComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() source: Blob = undefined;
  @Input() filename: string;
  @ViewChild('iframe') iframe: ElementRef;
  @Output() onCloseFrame: EventEmitter<any> = new EventEmitter();
  public blobURL: SafeResourceUrl;

  constructor() { }

  ngOnInit(): void {
    document.getElementById('iframe-background').addEventListener('click', () => {
      this.onCloseFrame.emit(true);
    });
    disableScroll();
  }

  ngAfterViewInit(): void {
    const blobURL = URL.createObjectURL(this.source);
    if (!(window as any).mobileCheck()) {
      this.iframe.nativeElement.src = "";
      this.iframe.nativeElement.src = blobURL;
      window.URL.revokeObjectURL(blobURL);
    } else {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = blobURL;
      a.download = this.filename;
      a.click();
      window.URL.revokeObjectURL(blobURL);
      this.onCloseFrame.emit(true);
    }
  }

  ngOnDestroy(): void {
    enableScroll();
  }
}
