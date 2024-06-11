import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { TranslateModule } from '@ngx-translate/core';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ConfirmationDialogModule } from '@intersystems/confirmation-dialog';
import { HeaderModule } from "@intersystems/header";
import { NotificationModule } from '@intersystems/notification';
import { TableModule } from "@intersystems/table";
import { SecretCellComponent } from './secret-cell/secret-cell.component';
import { IscFormModule } from '@intersystems/isc-form';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,

    // Angular Material stuff
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,

    // Frost Modules
    ConfirmationDialogModule,
    HeaderModule,
    NotificationModule,
    TableModule,
    TranslateModule.forRoot(),
    IscFormModule,
    FormlyModule.forRoot(),
    ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    SecretCellComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
