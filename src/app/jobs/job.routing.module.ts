import { RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobMyComponent } from './job-my/job-my.component';
import { JobNewComponent } from './job-new/job-new.component';

const routes = [
  {
      path: 'jobs',
      children: [
        {
          path: 'search',
          component: JobListComponent
        },
        {
          path: 'offer',
          component: JobListComponent
        },
        {
          path: 'new',
          component: JobNewComponent
        },
        {
          path: 'my',
          component: JobMyComponent
        },
      ]
  }
]

export const JobRoutingModule = RouterModule.forRoot(routes);
