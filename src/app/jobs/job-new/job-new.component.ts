import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-new',
  templateUrl: './job-new.component.html',
  styleUrls: ['./job-new.component.scss']
})
export class JobNewComponent {

  categories = this.jobService.categories;

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  submitHandler(jobToPost: IJob) {

    switch (jobToPost.category) {
      case 'it': jobToPost.color = 'pink'; break;
      case 'construction': jobToPost.color = 'yellow'; break;
      case 'gardening': jobToPost.color = 'green'; break;
      case 'cleaning': jobToPost.color = 'blue'; break;
      default: jobToPost.color = 'pink'; break;
    }

    let jobPost$: Observable<IJob>;

    if (jobToPost.option === 'search') {
      jobPost$ = this.jobService.postJob(jobToPost)
    } else if (jobToPost.option === 'offer') {
      jobPost$ = this.jobService.postFreelance(jobToPost)
    }

    jobPost$.subscribe(() => {
      this.router.navigate(['']);
    }, console.error);
  }

}
