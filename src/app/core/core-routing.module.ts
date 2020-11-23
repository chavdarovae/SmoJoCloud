import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';



const routes = [
  {
    path: 'home',
    component: HomeComponent
  },
 
]

export const CoreRoutingModule = RouterModule.forRoot(routes);
