import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { lastValueFrom } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  response: any;
  loginForm: FormGroup;
  validEmail: boolean = true;
  validPassword: boolean = true;
  
  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    this.validEmail = this.loginForm.controls['email'].valid;
    this.validPassword = this.loginForm.controls['password'].valid;

    if (this.loginForm.valid) {

      let header = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }

      const response$ = this.authenticationService.authenticate(header);
      this.response = await lastValueFrom(response$);

      //do this in a service???
      sessionStorage.setItem('id', this.response.id);
      sessionStorage.setItem('email', this.response.email);
      sessionStorage.setItem('type', this.response.type);
      sessionStorage.setItem('token', this.response.token);

      if (this.response.type == 'company')
        sessionStorage.setItem('name', this.response.name);
      else {
        sessionStorage.setItem('first_name', this.response.first_name);
        sessionStorage.setItem('last_name', this.response.last_name);
      }
      
      this.router.navigate(['/']);
    }
  }

}
