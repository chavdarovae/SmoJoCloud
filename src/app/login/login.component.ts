import { AuthStore } from './../shared/services/auth.store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  constructor(
    private router: Router,
    private auth: AuthStore
  ) { }


  login(data: {email: string, password: string}): void{
    this.auth.login(data.email, data.password)
      .subscribe(
        () => this.router.navigate(['']),
        err => alert('Login failed!')
      );
  }

}
