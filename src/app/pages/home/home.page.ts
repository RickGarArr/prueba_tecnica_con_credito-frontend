import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {

    }

    verEvaluados() {
        this.router.navigate(['/prospectos', ], {queryParams: {
            evaluados: true
        }});
    }

}