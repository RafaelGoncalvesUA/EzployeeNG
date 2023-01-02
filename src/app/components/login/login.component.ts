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

  loginForm: FormGroup;
  validEmail: boolean = true;
  validPassword: boolean = true;
  loginFail: boolean = false;
  
  constructor(private authenticationService: AuthenticationService) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    //reset session storage
    sessionStorage.clear();
    this.validEmail = this.loginForm.controls['email'].valid;
    this.validPassword = this.loginForm.controls['password'].valid;

    if (this.loginForm.valid) {

      let header = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }

      this.authenticationService.authenticate(header).subscribe(response => {

        if ('error' in response) {
          this.loginFail = true;
          this.loginForm.reset();
        }
        else {
    
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('type', response.type);
          sessionStorage.setItem('token', response.token);
    
          if (response.type == 'company')
            sessionStorage.setItem('name', response.name);
          else {
            sessionStorage.setItem('first_name', response.first_name);
            sessionStorage.setItem('last_name', response.last_name);
          }

          this.loginFail = false;
          window.location.href = '/';
        }
      });
    }
  }

}
