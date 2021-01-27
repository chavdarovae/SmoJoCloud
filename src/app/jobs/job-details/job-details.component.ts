import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, mapTo } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { IMsg } from 'src/app/shared/interfaces/message.interface';
import { LoadingService } from 'src/app/shared/loading.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  selectedJob$: Observable<IJob>
  isMsgBlockVisible: boolean = false;
  @ViewChild('jobMessageArea') jobMessageArea: ElementRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.loadingOn();
    console.log(this.jobService.searchMode);

    this.selectedJob$ = this.jobService.getJobById(this.jobService.searchMode ? 'jobList' : 'freelanceList', this.activatedRoute.snapshot.params.id)
      .pipe(map(jobs => jobs[0]),
        finalize(() => this.loadingService.loadingOff()))
  }

  submitHandler(message: IMsg) {
    this.loadingService.loadingOn();
    this.jobService.postJobMessage(message).pipe(
      finalize(() => {
        this.loadingService.loadingOff();
      })
    ).subscribe(() => {
      this.clearInputFields();
    }, console.error);
  }

  clearInputFields() {
    this.jobMessageArea.nativeElement.value = '';
    this.isMsgBlockVisible = false;
  }
}
