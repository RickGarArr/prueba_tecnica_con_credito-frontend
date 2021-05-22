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
    this.iframe.nativeElement.src = "";
    this.iframe.nativeElement.src = blobURL;
  }

  ngOnDestroy(): void {    
    enableScroll();
  }
}
