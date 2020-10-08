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

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  createOnlineMeeting(): void {
    console.log("inside onlineMeeting")
    this.graphService.onlineMeeting()
      .then((meeting) => {
        console.log("error in meeting"+meeting);
        this.meeting = meeting;
      });
  }

}
