import { Injectable } from '@angular/core';
import { NotificationService, NOTIFICATION_TYPE } from '@intersystems/notification';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  showNotifications = true;
  counter: number = 0;

  constructor(private notificationService : NotificationService) {}

  add(message: string) {
    this.messages.push(message);
    if (this.showNotifications) {
      this.counter++;
      let type = NOTIFICATION_TYPE.INFO;
      switch(this.counter % 4) {
        case 0:
          break;
        case 1:
          type = NOTIFICATION_TYPE.SUCCESS;
          break;
        case 2:
          type = NOTIFICATION_TYPE.WARNING;
          break;
        default:
          type = NOTIFICATION_TYPE.ALERT;
          break;
      }
      this.notificationService.show(type,message,5000);
    }
  }

  clear() {
    this.messages = [];
  }

  setShowNotifications(flag: boolean): void {
    this.showNotifications = flag;
  }
}
