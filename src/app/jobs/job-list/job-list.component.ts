import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { concatMap, finalize, map } from 'rxjs/operators';
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

  @ViewChild('filterForm', { read: NgForm })
  form: any;
  selectedValue: string;

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

<<<<<<< HEAD
  ngOnInit() {
    const loadList$ = this.jobService.getJobList(this.activateRoute.snapshot.data.collection);
            
    this.jobList$ =this.loadingService.showLoaderUntilCompleted( loadList$ );
=======
  ngOnInit(): void {
    // this.loadingService.loadingOn();

    this.jobList$ = this.jobService.getJobList(this.activateRoute.snapshot.data.collection)
      .pipe(
        // finalize(()=>this.loadingService.loadingOff())
      );

>>>>>>> b0023a3fe560f441fb3f068b72672ecae91e12c0

    const loadJobs$ = this.loadingService.showLoaderUntilCompleted(this.jobList$);

    this.locationSet$ = loadJobs$.pipe(
      map(jobs => Array.from(new Set(jobs.map(job => job.location))).sort())
    )

    this.categorySet$ = loadJobs$.pipe(
      map(jobs => Array.from(new Set(jobs.map(job => job.category))).sort())
    )

    concat(this.locationSet$,this.categorySet$).pipe(
      concatMap(()=>this.form.valueChanges)).subscribe(
        ()=>this.filter(this.form.value)
      );
    
  }

  filter(input: { location: string, category: string }) {
    const collection = this.activateRoute.snapshot.data.collection;
    this.jobList$ = this.jobService.getFilteredJobList(collection, input.location, input.category);
  }

  clearFilter(){
    this.form.resetForm();
  }
}
