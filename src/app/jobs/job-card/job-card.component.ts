import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  
  @Input() job: IJob;

  constructor() { }

  ngOnInit(): void {
  }

}
