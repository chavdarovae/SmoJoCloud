import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes = [
  {
    path: '',
    pathMath: 'full',
    component: HomeComponent
  },
  

]

export const AppRoutingModule = RouterModule.forRoot(routes);
