import { CommonModule } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { Notification } from '~/app/core/models/Notification';

@Component({
  selector: 'ns-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.css'],
  imports: [
    CommonModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class NotificationPopupComponent implements OnInit {
  public notifications: Notification[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public pushNotification(notification: Notification): void {
    console.log('Pushed notification: \n', notification);
    this.notifications.push(notification);
  }

  // PREVENT INTERACTION WITH THE BACK LAYER
  public onOverlayDummyTouch(): void {
    console.log('Overlay Dummy Touch');
  }
}

