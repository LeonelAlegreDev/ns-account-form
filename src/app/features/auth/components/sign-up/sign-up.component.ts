import { Component, inject } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
    selector: 'ns-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false,
})
export class SignUpComponent {
    // private supabaseService = inject(SupabaseService);


    constructor(private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }

    signUp() {
        console.log("Creando cuenta");

        const credenciales = {
            email: 'usuario1@email.com',
            username: 'usuario 1',
            password: '111111',
        }
        console.log(credenciales);
    }
}