import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { LoadingService } from 'src/app/shared/loading.service';
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

  constructor(
    private jobService: JobService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  submitHandler(jobToPost: IJob) {

    switch (jobToPost.category) {
      case 'IT&Hardware': jobToPost.color = 'pink'; break;
      case 'Construction&Refurbrishment': jobToPost.color = 'yellow'; break;
      case 'Gardening&Irrigation': jobToPost.color = 'green'; break;
      case 'Cleaning&Housekeeping': jobToPost.color = 'blue'; break;
      default: jobToPost.color = 'tomato'; break;
    }

    let collection = 'jobList'

    if (jobToPost.option === 'offer') {
      collection = 'freelanceList'
    }
    
    this.loadingService.loadingOn();
    this.jobService.postJob(jobToPost, collection)
        .pipe(
          finalize(()=>this.loadingService.loadingOff())
        )
        .subscribe(() => {
      this.router.navigate(['']);
    }, console.error);
  }

}
