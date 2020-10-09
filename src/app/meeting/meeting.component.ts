import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  public meeting: any[];

  public statusMsg: string;

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  createOnlineMeeting(): void {
    console.log("inside onlineMeeting")
    this.graphService.onlineMeeting()
      .then((meeting) => {
        //console.log("error in meeting"+meeting);
        this.statusMsg = "Meeting invite has been created successfully! Cheers :)";
        this.meeting = meeting;
      }).catch( err => {
        this.statusMsg = "Error occured in Meeting creation";
      });
  }

}
