import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})

export class RegisterCompanyComponent implements OnInit {

  response: any;
  registerForm: FormGroup;
  validName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validLocation: boolean = true;
  validDescription: boolean = true;
  logo: boolean = false;
  registerFail: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      descricao: new FormControl(''),
      logo: new FormControl(null)
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('logo').setValue(file);
      this.logo = true;
    }
    else
      this.logo = false;
  }

  onSubmit() {
    this.validName = this.registerForm.controls['nome'].valid;
    this.validEmail = this.registerForm.controls['email'].valid;
    this.validPassword = this.registerForm.controls['password'].valid;
    this.validLocation = this.registerForm.controls['localizacao'].valid;
    this.validDescription = this.registerForm.controls['descricao'].valid;

    if (this.registerForm.valid) {
      let formData = null;

      if (this.logo) {
        formData = new FormData();
        formData.append('name', this.registerForm.value.nome);
        formData.append('email', this.registerForm.value.email);
        formData.append('password', this.registerForm.value.password);
        formData.append('location', this.registerForm.value.localizacao);
        formData.append('description', this.registerForm.value.descricao);
        formData.append('logo', this.registerForm.get('logo').value);
      }
      else {
        formData = {
          name: this.registerForm.value.nome,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          location: this.registerForm.value.localizacao,
          description: this.registerForm.value.descricao,
          logo: null
        }
      }

      this.authenticationService.registerCompany(formData).subscribe(response => {
        
        if ('error' in response) {
          this.registerFail = true;
          this.registerForm.reset();
        }
        else
          this.router.navigate(['/login']);

      });

    }
  }

}
