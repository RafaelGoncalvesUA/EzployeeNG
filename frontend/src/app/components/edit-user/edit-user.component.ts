import { Component } from '@angular/core';  
import { OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  @Output() editUserDone = new EventEmitter<boolean>();
  editUserForm: FormGroup;
  profile_pic: boolean = false;
  validFname: boolean = true;
  validLname: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  showForm: boolean = true;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.editUserForm = new FormGroup({
      first_name: new FormControl(this.user.first_name, Validators.required),
      last_name: new FormControl(this.user.last_name, Validators.required),
      email: new FormControl({value: this.user.email, disabled: true}),
      password: new FormControl('', Validators.required),
      profile_pic: new FormControl(null)
    });

  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editUserForm.get('profile_pic').setValue(file);
      this.profile_pic = true;
    }
    else
      this.profile_pic = false;
  }

  async onSubmit() {
    this.validFname = this.editUserForm.controls['first_name'].valid;
    this.validLname = this.editUserForm.controls['last_name'].valid;
    this.validEmail = this.editUserForm.controls['email'].valid;
    this.validPassword = this.editUserForm.controls['password'].valid;

    if (this.editUserForm.valid) {
      let formData = null;

      if (this.profile_pic) {
        formData = new FormData();
        formData.append('first_name', this.editUserForm.value.first_name);
        formData.append('last_name', this.editUserForm.value.last_name);
        formData.append('email', this.editUserForm.value.email);
        formData.append('password', this.editUserForm.value.password);
        formData.append('profile_pic', this.editUserForm.get('profile_pic').value);
      }
      else {
        formData = {
          first_name: this.editUserForm.value.first_name,
          last_name: this.editUserForm.value.last_name,
          email: this.user.email,
          password: this.editUserForm.value.password
        }
      }

      //api call
      this.authService.updateUser(this.user.id, formData).subscribe();
      this.showForm = false;
    }
  }

  reload() {
    this.editUserDone.emit(true);
  }
}
