import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobStore } from 'src/app/shared/services/jobs.store';

@Component({
  selector: 'app-job-my',
  templateUrl: './job-my.component.html',
  styleUrls: ['./job-my.component.scss']
})
export class JobMyComponent implements OnInit {

  jobList$: Observable<IJob[]>;
  freelanceList$: Observable<IJob[]>;

  constructor(
    private jobStore: JobStore
  ) {}

  ngOnInit(){
    this.jobList$ = this.jobStore.filterByUserId(true);
    this.freelanceList$ = this.jobStore.filterByUserId(false);
  }
}
