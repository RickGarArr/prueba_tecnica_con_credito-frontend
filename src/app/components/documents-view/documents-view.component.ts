import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents-view',
  templateUrl: './documents-view.component.html',
  styleUrls: ['./documents-view.component.css']
})
export class DocumentsViewComponent implements OnInit {

  @Input() files: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
