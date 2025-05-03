import { Component, NO_ERRORS_SCHEMA, ViewContainerRef, ViewChild } from '@angular/core';
import { NativeScriptCommonModule, PageRouterOutlet } from '@nativescript/angular';
import { firebase } from '@nativescript/firebase-core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  imports: [
    PageRouterOutlet,
    NativeScriptCommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
  ]
})
export class AppComponent {
  @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
  
  constructor() {
  }
  
  async ngOnInit() {
    const firebaseApp = await firebase().initializeApp().then((app) => {
      console.log("Firebase initialized successfully");
      return app;
    }, (error) => {
      console.error("Error initializing Firebase:", error);
      return null;
    });
  }
}
