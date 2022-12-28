import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register-company-page',
  templateUrl: './register-company-page.component.html',
  styleUrls: ['./register-company-page.component.css']
})
export class RegisterCompanyPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(name:string, email:string, password:string, location:string, description:string, logo:any) {
    console.log(name, email, password, location, description, logo);
  }

}
