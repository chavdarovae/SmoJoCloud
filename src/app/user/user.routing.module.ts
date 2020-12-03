import { RouterModule } from '@angular/router';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes = [
  {
    path: 'user',
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {isLogged: true}
      },
      {
        path: 'modify',
        component: UserModifyComponent,
        data: {isLogged: true}
      }
    ]
  }

]


export const UserRoutingModule = RouterModule.forRoot(routes);
