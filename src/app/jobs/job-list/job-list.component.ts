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

  jobList$: Observable<[IJob]>;
  filteredJobList$: Observable<[IJob]>;

  jobList: [IJob];
  searchMode: boolean = true;
  categories = this.jobService.categories;
  locations = this.jobService.locations;

  get jobListIsAvailable() {
    return !!this.jobList;
  }

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;

    if (url.includes('search')) {
      this.jobList$ = this.jobService.getJobList();
    } else if (url.includes('offer')) {
      this.searchMode = false;
      console.log(this.searchMode);
      
      this.jobList$ = this.jobService.getFreelanceList();
    }

    this.jobList$.subscribe((res) => {
      this.jobList = res;
    }, console.error);

  }

  jobSelectHandler() { }

  filter(input: { location: string, category: string }, mode: string) {
    if(mode==='search'){
      this.filteredJobList$ = this.jobService.getFilteredJobList(input.location, input.category);
    }else if(mode==='offer'){
      this.filteredJobList$ = this.jobService.getFilteredFreelanceList(input.location, input.category);
    }

    this.filteredJobList$.subscribe((res) => {
      this.jobList = res;
    }, console.error);
  }

}
