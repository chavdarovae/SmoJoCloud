import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  submitHandler(data:{email: string, passwords: {password: string}}){
    this.userService.register(data.email, data.passwords.password).subscribe(()=>{
      this.router.navigate(['/login']);
    }, console.error);
  }
}
