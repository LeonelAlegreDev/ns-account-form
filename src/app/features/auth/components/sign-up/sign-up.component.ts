import { Component } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
    selector: 'ns-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false,
})
export class SignUpComponent {
    constructor(private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }

    ngOnInit(): void {

    }
}