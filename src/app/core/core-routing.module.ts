import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';


const routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { isLogged: false }
  },
]

export const CoreRoutingModule = RouterModule.forRoot(routes);
