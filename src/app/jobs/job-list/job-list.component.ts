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
    let collection = 'jobList';

    if (url.includes('offer')) {
      this.searchMode = false;
      collection = 'freelanceList'
    }
    this.jobList$ = this.jobService.getJobList(collection);


    // this.jobList$.subscribe((res) => {
    //   this.jobList = res;
    // }, console.error);

  }

  jobSelectHandler() { }

  filter(input: { location: string, category: string }, mode: string) {
    
    const url = this.returnFilterUrl(input.location, input.category, mode);

    this.jobList$ = this.jobService.getFilteredJobList(url);
  }

  returnFilterUrl(location: string, category: string, mode: string) {
    let collection = 'jobList';
    if (mode === 'offer') {
      collection = 'freelanceList';
    }

    if (location && category) {
      return `data/${collection}?where=location%20%3D%20'${location}'and%20category%20%3D%20'${category}'&sortBy=created%20desc`
    } else if (!location) {
      return `data/${collection}?where=category%20%3D%20'${category}'&sortBy=created%20desc`
    } else if (!category) {
      return `data/${collection}?where=location%20%3D%20'${location}'&sortBy=created%20desc`
    }
  }

}
