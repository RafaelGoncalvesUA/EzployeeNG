import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  response: any;
  
  constructor(private apiRequestsService: ApiRequestsService) { }
  
  ngOnInit(): void {
  }

  async login(email: string, password: string) {
    const response$ = this.apiRequestsService.authenticate(email, password);
    this.response = await lastValueFrom(response$);
    sessionStorage.setItem('token', this.response.token);
    sessionStorage.setItem('user', this.response.user);
  }

}
