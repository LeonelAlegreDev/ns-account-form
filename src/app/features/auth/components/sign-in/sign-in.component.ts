import { Component } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
    selector: 'ns-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: false,
})
export class SignInComponent {
    constructor(private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }

    ngOnInit(): void {

    }
}