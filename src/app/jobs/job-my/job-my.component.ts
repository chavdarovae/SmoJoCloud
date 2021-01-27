import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { LoadingService } from 'src/app/shared/loading.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-my',
  templateUrl: './job-my.component.html',
  styleUrls: ['./job-my.component.scss']
})
export class JobMyComponent {

  jobList$: Observable<[IJob]>;
  freelanceList$: Observable<[IJob]>;

  constructor(
    private jobService: JobService,
    private loadingService: LoadingService
  ) { 
    this.loadLists();
  }

  loadLists(){
    this.loadingService.loadingOn();
    this.jobList$ = this.jobService.getJobListByUserId('jobList')
        .pipe(
          finalize(()=> this.loadingService.loadingOff())
        )
    this.freelanceList$ = this.jobService.getJobListByUserId('freelanceList');
  }

  turnOnSerchMode (job:IJob){
    this.jobService.searchMode = true;
  }

  turnOffSerchMode (job:IJob){
    this.jobService.searchMode = false;
  }
}
