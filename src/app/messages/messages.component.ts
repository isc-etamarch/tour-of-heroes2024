import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService, public _bottomSheetRef: MatBottomSheetRef<MessagesComponent>) {}

  ngOnInit() {
    this._bottomSheetRef.afterDismissed().subscribe(() => {
      this.messageService.clear();
    })
  }

  clear() {
    this._bottomSheetRef.dismiss();
  }

  toggleNotifications(e) {
    this.messageService.setShowNotifications(e.target.checked);
  }
}
