import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void { }

  login(email: string, password: string) {
    console.log(email, password);
  }

}
