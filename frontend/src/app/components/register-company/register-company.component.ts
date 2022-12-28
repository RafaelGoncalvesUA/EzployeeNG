import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})

export class RegisterCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(name:string, email:string, password:string, location:string, description:string, logo:any) {
    console.log(name, email, password, location, description, logo);
  }

}
