import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  
  @Input() job: IJob;
  @Output() changeModeEvent: EventEmitter<IJob> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectJobHandler(job: IJob){
    console.log('selektiram');
    
    this.changeModeEvent.emit(job);
  }

}
