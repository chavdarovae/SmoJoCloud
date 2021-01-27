import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { IJob } from '../shared/interfaces/job.interface';

@Pipe({
  name: 'canShowDetails'
})
export class CanShowDetailsPipe implements PipeTransform {

  constructor(private activateRoute: ActivatedRoute){}

  transform(job: IJob): any {
    return this.activateRoute.snapshot.data.shouldShowDetails;
  }

}
