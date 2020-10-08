// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet>
import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';

import { AuthService } from './auth.service';
import { Event } from './event';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService) {

    // Initialize the Graph client
    this.graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        let token = await this.authService.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  }

  async getEvents(): Promise<Event[]> {
    try {
      let result =  await this.graphClient
        .api('/me/events')
        .select('subject,organizer,start,end')
        .orderby('createdDateTime DESC')
        .get();
        //console.log(result.value);
      return result.value;
    } catch (error) {
      //console.log(error);
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }

  async onlineMeeting(): Promise<Event[]> {
    const onlineMeeting = {
      startDateTime:"2020-10-10T14:30:34.2444915-07:00",
      endDateTime:"2020-10-10T15:00:34.2464912-07:00",
      subject:"Meeting1"
    }
    try {
      console.log(onlineMeeting);
      let result =  await this.graphClient
        .api('/v1.0/me/onlineMeetings')
        //.select('subject,organizer,start,end')
        //.orderby('createdDateTime DESC')
        .post(onlineMeeting);
        //console.log(result.value);
      return result.value;
    } catch (error) {
      console.log(error);
      this.alertsService.add('Could not create meeting', JSON.stringify(error, null, 2));
    }
  }
}
// </graphServiceSnippet>
