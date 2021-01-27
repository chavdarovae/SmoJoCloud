import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { JobService } from 'src/app/jobs/job.service';
import { IMsg } from 'src/app/shared/interfaces/message.interface';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  messages$: Observable <[IMsg]>;
 
  constructor(
    private jobService: JobService,
    private loadingService: LoadingService,
    ){ }

  ngOnInit (): void  {
    this.loadingService.loadingOn();
    this.messages$ = this.jobService.getMessagesByUserId()
      .pipe(finalize(()=>this.loadingService.loadingOff()));
  }
}
