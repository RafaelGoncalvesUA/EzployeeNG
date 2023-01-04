import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  @Input() company: Company;
  @Output() editCompanyDone = new EventEmitter<boolean>();
  editCompanyForm: FormGroup;
  logo: boolean = false;
  validName: boolean = true;
  validPassword: boolean = true;
  validLocation: boolean = true;
  validDescription: boolean = true;
  showForm: boolean = true;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.editCompanyForm = new FormGroup({
      nome: new FormControl(this.company.name, Validators.required),
      email: new FormControl({value: this.company.email, disabled: true}),
      password: new FormControl('', Validators.required),
      localizacao: new FormControl(this.company.location, Validators.required),
      descricao: new FormControl(this.company.description),
      logo: new FormControl(null)
    });

  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editCompanyForm.get('logo').setValue(file);
      this.logo = true;
    }
    else
      this.logo = false;
  }

  async onSubmit() {
    this.validName = this.editCompanyForm.controls['nome'].valid;
    this.validPassword = this.editCompanyForm.controls['password'].valid;
    this.validLocation = this.editCompanyForm.controls['localizacao'].valid;
    this.validDescription = this.editCompanyForm.controls['descricao'].valid;

    if (this.editCompanyForm.valid) {
      let formData = null;

      if (this.logo) {
        formData = new FormData();
        formData.append('name', this.editCompanyForm.value.nome);
        formData.append('email', this.company.email);
        formData.append('password', this.editCompanyForm.value.password);
        formData.append('location', this.editCompanyForm.value.localizacao);
        formData.append('description', this.editCompanyForm.value.descricao);
        formData.append('logo', this.editCompanyForm.get('logo').value);
      }
      else {
        formData = {
          name: this.editCompanyForm.value.nome,
          email: this.company.email,
          password: this.editCompanyForm.value.password,
          location: this.editCompanyForm.value.localizacao,
          description: this.editCompanyForm.value.descricao
        }
      }

      //api call
      this.authService.updateCompany(this.company.id, formData).subscribe();
      this.showForm = false;
    }
  }

  reload() {
    this.editCompanyDone.emit(true);
  }

}
