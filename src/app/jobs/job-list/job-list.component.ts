import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgSelectOption } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobStore } from 'src/app/shared/services/jobs.store';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, AfterViewInit {

  jobList$: Observable<IJob[]>;
  locationSet: String[];
  categorySet: String[];

  @ViewChild('filterForm', { read: NgForm }) form: any;

  get searchMode() {
    return this.jobService.searchMode;
  }

  constructor(
    private jobService: JobService,
    private jobStore: JobStore,
    private activateRoute: ActivatedRoute
  ) {
    this.jobService.searchMode = 'search' === this.activateRoute.snapshot.data.mode;
  }

  ngOnInit() {
    this.reloadJobs();
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(()=>this.filter(this.form.value))
  }

  reloadJobs() {
    // loads the ads from the store
    this.jobList$ = this.searchMode ? this.jobStore.jobs$ : this.jobStore.freelances$;
    // gets the location set from the store
    this.locationSet = this.searchMode ? this.jobStore.jobLocationSet: this.jobStore.freelanceLocationSet;
    // gets the category set from the store
    this.categorySet = this.searchMode ? this.jobStore.jobCategorySet : this.jobStore.freelanceCategorySet;
  }

  filter(input: { location: string, category: string }) {
    const collection = this.activateRoute.snapshot.data.collection;
    this.jobList$ = this.jobStore.filterByLocationOrCategory(this.searchMode, input.location, input.category);
  }

  clearFilter(){
    this.form.setValue({category: "", location: ""});
  }
}
