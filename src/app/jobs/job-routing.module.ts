import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { JobListComponent } from './job-list/job-list.component';




const routes = [
  {
      path: "jobs",
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
          component: HomeComponent
        },
      ]
  }
]

export const JobRoutingModule = RouterModule.forRoot(routes);
