import { Component, OnInit } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-my',
  templateUrl: './job-my.component.html',
  styleUrls: ['./job-my.component.scss']
})
export class JobMyComponent implements OnInit {

  jobList: [IJob];
  freelanceList: [IJob];

  get areListsAvailable ():Boolean {
    return (!!this.jobList) || (!!this.freelanceList)
  }

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.jobService.getJobListByUserId().subscribe((res) => {
      this.jobList = res;
    }, console.error);

    this.jobService.getFreelanceListByUserId().subscribe((res) => {
      this.freelanceList = res;
    }, console.error);
  }

}
