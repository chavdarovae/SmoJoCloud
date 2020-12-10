import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  selectedJob$: Observable <IJob>

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.selectedJob$ = this.jobService.getJobById(this.jobService.searchMode?'jobList':'freelanceList',this.activatedRoute.snapshot.params.id)
  }

}
