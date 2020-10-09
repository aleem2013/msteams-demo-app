// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { MsalModule } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { OAuthSettings } from '../oauth';
import { CalendarComponent } from './calendar/calendar.component';
import { MeetingComponent } from './meeting/meeting.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent,
    CalendarComponent,
    MeetingComponent
  ],
  // <imports>
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId,
        authority: OAuthSettings.authority,
        redirectUri: OAuthSettings.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'calendars.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read', 'calendars.read', 'onlinemeetings.readwrite']]
      ],
      extraQueryParameters: {}
    })
  ],
  // </imports>
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Register the FontAwesome icons used by the app
    library.addIcons(faExternalLinkAlt, faUserCircle);
  }
 }
