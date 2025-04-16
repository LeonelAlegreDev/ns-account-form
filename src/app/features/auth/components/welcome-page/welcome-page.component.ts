import { Component, NO_ERRORS_SCHEMA, OnInit, ViewChild, ViewContainerRef, inject, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Notification } from '~/app/core/models/Notification';
import { NotificationPopupComponent } from '~/app/core/components/notification-popup/notification-popup.component';

@Component({
    selector: 'ns-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css'],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptCommonModule,
    ],
})
export class WelcomePageComponent implements OnInit {
    @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
    private notificationPopupCR: ComponentRef<NotificationPopupComponent> | null = null;


    constructor(private router: Router, private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }
    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        this.notificationPopupCR = this.notificationPopupRef.createComponent(NotificationPopupComponent);

    }


    public onCreateAccountTap(): void {
        console.log('Crear Cuenta presionado');
        const notification: Notification = {
            message: 'Se ha presionado el botón Crear Cuenta',
        }
        this.notificationPopupCR.instance.pushNotification(notification);
    }

    public onLoginTap(): void {
        console.log('Iniciar Sesión presionado');
        const notification: Notification = {
            message: 'Se ha presionado el botón Iniciar Sesión',
        }
        this.notificationPopupCR.instance.pushNotification(notification);
    }
}