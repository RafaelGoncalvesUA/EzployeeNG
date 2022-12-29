import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { Company } from 'src/app/classes/Company';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reserved-area-page',
  templateUrl: './reserved-area-page.component.html',
  styleUrls: ['./reserved-area-page.component.css']
})
export class ReservedAreaPageComponent implements OnInit {

  type: string | undefined;
  user: User | undefined;
  company: Company | undefined;  

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() { 
    
    if (this.authService.loggedIn()) {
      this.type = this.authService.getUserInfo().type;
      if (this.type == 'user') {
        // call api to get user info
        this.user = undefined;
      } else if (this.type == 'company') {
        // call api to get company info
        this.company = undefined;
      }
    }
    this.type='company';
  }

  edit() {

  }
  
  favs() {

  }

  add_offer() {

  }

  offers() {

  }

  comments() {

  }
}
