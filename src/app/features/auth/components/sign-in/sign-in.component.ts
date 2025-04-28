import { Component, ComponentRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Page } from '@nativescript/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationPopupComponent } from '~/app/core/components/notification-popup/notification-popup.component';
import { Notification } from '~/app/core/models/Notification';


@Component({
    selector: 'ns-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: false,
})
export class SignInComponent {
    // Importar el servicio de autenticación
    // ERROR AL INYECTAR EL SERVICIO
    // private fireAuthService = inject(FireAuthService);

    // Sistema de notificaciones
    @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
    private notificationPopupCR: ComponentRef<NotificationPopupComponent> | null = null;
    // Propiedades del formulario
    public email = '';
    protected password = '';
    // Validaciones de los campos
    public emailControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }

    ngAfterViewInit(): void {
        // Crear el componente de notificaciones
        this.notificationPopupCR = this.notificationPopupRef.createComponent(NotificationPopupComponent);
    }

    async signIn() {
        if (!this.emailControl.valid)  {
            const notification: Notification = {
                message: 'El correo electrónico no es válido.',
            };
            this.notificationPopupCR.instance.pushNotification(notification);
            return;
        }
        if (!this.passwordControl.valid) {
            const notification: Notification = {
                message: 'La contraseña no es válida.',
            };
            this.notificationPopupCR.instance.pushNotification(notification);
            return;
        }

        try{
            // Llamar al servicio de autenticación
            // const userCredential = await this.fireAuthService.Login(this.email, this.password);
            // console.log('Usuario autenticado:', userCredential.user);
            
            // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        }
        catch (error) {
            console.log('Error al iniciar sesión:', error);
        }

    }
}