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
  profile_pic: boolean = false;

  constructor(private apiRequestsService: ApiRequestsService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      apelido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      profile_pic: new FormControl(null)
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('profile_pic').setValue(file);
      this.profile_pic = true;
    }
    else
      this.profile_pic = false;
  }

  async onSubmit() {
    this.validNome = this.registerForm.controls['nome'].valid;
    this.validApelido = this.registerForm.controls['apelido'].valid;
    this.validEmail = this.registerForm.controls['email'].valid;
    this.validPassword = this.registerForm.controls['password'].valid;

    if (this.registerForm.valid) {
      let formData = null;

      if (this.profile_pic) {
        formData = new FormData();
        formData.append('first_name', this.registerForm.value.nome);
        formData.append('last_name', this.registerForm.value.apelido);
        formData.append('email', this.registerForm.value.email);
        formData.append('password', this.registerForm.value.password);
        formData.append('profile_pic', this.registerForm.get('profile_pic').value);
      }
      else {
        formData = {
          first_name: this.registerForm.value.nome,
          last_name: this.registerForm.value.apelido,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          profile_pic: null
        }
      }

      const response$ = this.apiRequestsService.registerUser(formData);
      this.response = await lastValueFrom(response$);
      console.log(this.response);

      //if success
      this.router.navigate(['/login']);

      //TODO: if not success
      //show error message in UI
    }
  }

}
