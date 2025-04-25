import { Component, NO_ERRORS_SCHEMA, ViewContainerRef, ViewChild } from '@angular/core';
import { NativeScriptCommonModule, PageRouterOutlet } from '@nativescript/angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  imports: [
    PageRouterOutlet,
    NativeScriptCommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {
  @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
  
  constructor() {
    // initializeApp();
  }
}
