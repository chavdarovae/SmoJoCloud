import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { LoadingService } from 'src/app/shared/loading.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobList$: Observable<[IJob]>;
  locationSet$: Observable<String[]>;
  categorySet$: Observable<String[]>;

  get searchMode() {
    return this.jobService.searchMode;
  }

  constructor(
    private jobService: JobService,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.jobService.searchMode = 'search' === this.activateRoute.snapshot.data.mode;
  }

  ngOnInit(): void {
    // this.loadingService.loadingOn();

    this.jobList$ = this.jobService.getJobList(this.activateRoute.snapshot.data.collection)
      .pipe(
        // finalize(()=>this.loadingService.loadingOff())
      );


    const loadJobs$ = this.loadingService.showLoaderUntilCompleted(this.jobList$);

    this.locationSet$ = loadJobs$.pipe(
      map(jobs => Array.from(new Set(jobs.map(job => job.location))).sort())
    )

    this.categorySet$ = loadJobs$.pipe(
      map(jobs => Array.from(new Set(jobs.map(job => job.category))).sort())
    )
  }

  filter(input: { location: string, category: string }) {
    const collection = this.activateRoute.snapshot.data.collection;
    this.jobList$ = this.jobService.getFilteredJobList(collection, input.location, input.category);
  }
}
