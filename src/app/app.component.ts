import { Component, NO_ERRORS_SCHEMA, ViewContainerRef, ViewChild } from '@angular/core';
import { NativeScriptCommonModule, PageRouterOutlet } from '@nativescript/angular';
import { firebase } from '@nativescript/firebase';
import { CoreModule } from './core/core.module';

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
  
  ngOnInit() {
    firebase.init({
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}
