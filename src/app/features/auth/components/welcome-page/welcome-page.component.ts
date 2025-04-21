import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '@nativescript/core';
import { NotificationPopupComponent } from '~/app/core/components/notification-popup/notification-popup.component';
import { RouterExtensions } from '@nativescript/angular';
import { inject } from '@angular/core';


@Component({
    selector: 'ns-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css'],
    standalone: false,
})
export class WelcomePageComponent implements OnInit {
    @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
    private notificationPopupCR: ComponentRef<NotificationPopupComponent> | null = null;
    private routerExtensions = inject(RouterExtensions);

    constructor(private router: Router, private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }
    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        // TODO: Remove this when the notification popup is implemented
        this.notificationPopupCR = this.notificationPopupRef.createComponent(NotificationPopupComponent);
    }

    public onCreateAccountTap(): void {
        this.routerExtensions.navigate(['auth/sign-up']);
    }

    public onLoginTap(): void {
        console.log('Iniciar Sesión presionado');
    }
}