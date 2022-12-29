import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  response: any;
  registerForm: FormGroup;
  validNome: boolean = true;
  validApelido: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;

  constructor(private apiRequestsService: ApiRequestsService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      apelido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    this.validNome = this.registerForm.controls['nome'].valid;
    this.validApelido = this.registerForm.controls['apelido'].valid;
    this.validEmail = this.registerForm.controls['email'].valid;
    this.validPassword = this.registerForm.controls['password'].valid;

    if (this.registerForm.valid) {

      let header = {
        "first_name": this.registerForm.value.nome,
        "last_name": this.registerForm.value.apelido,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password
      }

      const response$ = this.apiRequestsService.registerUser(header);
      this.response = await lastValueFrom(response$);
      console.log(this.response);

      //if success
      this.router.navigate(['/login']);

      //TODO: if not success
      //show error message in UI
    }
  }

}
