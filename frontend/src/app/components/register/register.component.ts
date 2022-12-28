import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  register(nome: string, apelido: string, email: string, password: string) {
    console.log(nome, apelido, email, password);
  }

}
