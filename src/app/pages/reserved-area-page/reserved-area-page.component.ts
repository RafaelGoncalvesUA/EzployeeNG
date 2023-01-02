import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { Company } from 'src/app/classes/Company';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserved-area-page',
  templateUrl: './reserved-area-page.component.html',
  styleUrls: ['./reserved-area-page.component.css']
})
export class ReservedAreaPageComponent implements OnInit {

  userId: number;
  type: string;
  user: User;
  company: Company;

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiRequestsService,
    private router: Router
  ) { }

  ngOnInit() {
    
    if (!this.authService.loggedIn())
      this.router.navigate(['/login']);
    else {
      let userInfo = this.authService.getUserInfo();

      if (userInfo.type == 'user') {
        this.type = 'user';
        this.userId = +userInfo.id;
        this.getUserInfo();
      }
      else if (userInfo.type == 'company') {
        this.type = 'company';
        this.userId = +userInfo.id;
        this.getCompanyInfo();
      }
    }
  }


  getUserInfo() {
    this.apiService.getUserById(this.userId).subscribe((data: User) => this.user = data);
  }

  getCompanyInfo() {
    this.apiService.getCompanyById(this.userId).subscribe((data: Company) => this.company = data);
  }

  reload() {
    this.user = undefined;
    this.company = undefined;
    
    if (this.type == 'user')
      this.getUserInfo();
    else if (this.type == 'company')
      this.getCompanyInfo();
  }

}
