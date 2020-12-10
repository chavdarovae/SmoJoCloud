import { RouterModule } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobMyComponent } from './job-my/job-my.component';
import { JobNewComponent } from './job-new/job-new.component';

const routes = [
  {
    path: 'jobs',
    children: [
      {
        path: 'search',
        component: JobListComponent,
        data: {
          collection: 'jobList',
          mode: 'search'
        }
      },
      {
        path: 'offer',
        component: JobListComponent,
        data: {
          collection: 'freelanceList',
          mode: 'freelance'
        } 
      },
      {
        path: 'new',
        component: JobNewComponent,
        data: {
          isLogged: true,
        }
      },
      {
        path: 'my',
        component: JobMyComponent,
        data: {
          isLogged: true,
        }
      },
      {
        path: 'details/:id',
        component: JobDetailsComponent,
        data: {
          isLogged: true,
          collection: 'jobList',
        }
      },
    ]
  }
]

export const JobRoutingModule = RouterModule.forRoot(routes);
