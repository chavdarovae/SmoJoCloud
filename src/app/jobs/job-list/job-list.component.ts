import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Observable, throwError } from 'rxjs';
import { catchError, concatMap, finalize, map } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
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
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.jobService.searchMode = 'search' === this.activateRoute.snapshot.data.mode;
  }

  ngOnInit() {
    const loadList$ = this.jobService.getJobList(this.activateRoute.snapshot.data.collection)
      .pipe(
        // We do need to add Error handling to our JobListComponent
        catchError(err => {
          const message = 'Could not load job list!'
          this.messagesService.showErrors(message);
          console.log(message, err);
          // We do need to create an observable that replaces the observable that errored out
          // This new obsevaable emits only one value: err, and that terminates here the observable chain
          return throwError(err);
        })
      );
      this.jobList$ = this.loadingService.showLoaderUntilCompleted( loadList$ );

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
