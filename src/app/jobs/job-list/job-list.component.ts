import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobList: [IJob];
  categories = this.jobService.categories;
  locations = this.jobService.locations;

  get jobListIsAvailable () {
    return !!this.jobList;
  }

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;
    let jobList$: Observable<[IJob]>;

    if(url.includes('search')){
      jobList$=this.jobService.getJobList();
    }else if(url.includes('offer')){
      jobList$=this.jobService.getFreelanceList();
    }

    jobList$.subscribe((res)=>{
      this.jobList = res;
    }, console.error);
    
  }

  jobSelectHandler(){}

}
