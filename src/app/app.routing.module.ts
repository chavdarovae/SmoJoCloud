import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

const routes = [
  {
    path: '',
    pathMath: 'full',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {isLogged: false}
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  

]

export const AppRoutingModule = RouterModule.forRoot(routes);
