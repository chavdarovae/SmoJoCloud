import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobStore } from 'src/app/shared/services/jobs.store';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-new',
  templateUrl: './job-new.component.html',
  styleUrls: ['./job-new.component.scss']
})
export class JobNewComponent {

  categories = [
    'IT&Hardware',
    'Construction&Refurbrishment',
    'Gardening&Irrigation',
    'Cleaning&Housekeeping'
  ];
  searchMode = true;

  constructor(
    private jobService: JobService,
    private router: Router,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private jobSotre: JobStore
  ) { }

  submitHandler(jobToPost: IJob) {

    switch (jobToPost.category) {
      case 'IT&Hardware': jobToPost.color = 'pink'; break;
      case 'Construction&Refurbrishment': jobToPost.color = 'yellow'; break;
      case 'Gardening&Irrigation': jobToPost.color = 'green'; break;
      case 'Cleaning&Housekeeping': jobToPost.color = 'blue'; break;
      default: jobToPost.color = 'tomato'; break;
    }

    if (jobToPost.option === 'offer') {
      this.searchMode = false
    }
    
    this.jobSotre.saveNewAd(jobToPost, this.searchMode)
      .pipe(
        tap(res => this.router.navigate(['']))
      ).subscribe();
  }

}
