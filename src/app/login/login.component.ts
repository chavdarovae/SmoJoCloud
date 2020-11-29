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
    private userService: UserService
  ) { }


  submitHandler(data: {email: string, password: string}){
    this.userService.login(data.email, data.password).subscribe(()=>{
      this.router.navigate(['']);
    }, console.error);
  }
  
}
