import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogConfigService } from '@intersystems/confirmation-dialog';
import {AppNameConfig, HeaderConfig, MenusConfig, TopbarControlService} from '@intersystems/header';
import { IscFormConfigService } from '@intersystems/isc-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appNameData: AppNameConfig = {
    appName: 'Tour of Heroes',
    appNameAllCaps: false
  };
  headerData: HeaderConfig = {
    companyLogo: {
      link: '/dashboard'
    }
  };
  menuData: MenusConfig = {
    hamburgerMenu: {
      useOnDesktop: true,
      useOnMobile: true,
      data:[{
        id: "dashboard",
        name: "Dashboard"
      }, {
        id: "heroes",
        name: "Heroes"
      }]
    },
    avatarMenu: {
      useOnMobile: true,
    },
    onItemClick: (event: any) => {
      this.menuData.hamburgerMenu.activeNodeId = event.id;
      this.router.navigate([event.id]);
    }
  };

  constructor(
    private matBottomSheet: MatBottomSheet,
    public messageService: MessageService,
    public translate: TranslateService,
    private confirmationDialogConfigService: ConfirmationDialogConfigService,
    private topbarControlService: TopbarControlService,
    private iscFormConfigService: IscFormConfigService,
    private router: Router
    ) {
      this.translate.onLangChange.subscribe(() => {
        this.confirmationDialogConfigService.configureTranslation();
        this.iscFormConfigService.configureTranslation();
        this.topbarControlService.setUsernameData({
          userName: 'Frosty The Snowman',
          textAboveUserName: 'Example',
          hideOnMobile: false
      })
      });
      translate.addLangs(['en-us']);
      translate.setDefaultLang('en-us');
      translate.use('en-us');
    }

  openBottomSheet(): void {
    this.matBottomSheet.open(MessagesComponent);
  }
}
