import { Component } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})


export class CompanyCardComponent implements OnInit {

  @Input() company: Company;
  @Output() unfavEvent = new EventEmitter();
  logoImage: any;
  isImageLoading: boolean = true;
  userId: number;
  userType: string;

  constructor(
    private apiRequestService : ApiRequestsService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {}

  ngOnInit() {
    //check if user is logged in
    this.userId = this.authenticationService.loggedIn() ? +this.authenticationService.getUserInfo().id : undefined;
    this.userType = this.authenticationService.loggedIn() ? this.authenticationService.getUserInfo().type : undefined;

    if (this.company.logo != null)
      this.getImageFromService();
    else
      this.logoImage = "assets/images/default_image.png";

    //round avg_rating
    this.company.avg_rating = Number((this.company.avg_rating).toFixed(1));
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.logoImage = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  
  getImageFromService() {
    if (this.company.logo != null) {
      this.isImageLoading = true;
      this.apiRequestService.getImage(this.company.logo).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    }
  }

  fav() {
    if (this.userId == undefined) {
      this.router.navigate(['/login']);
      return;
    }
    this.company.fav = true;
    this.apiRequestService.favCompany(this.company.id, this.userId).subscribe(data => {}), error => {
      this.company.fav = false;
      console.log(error);
    }
  }

  unfav() {
    if (this.userId == undefined) {
      this.router.navigate(['/login']);
      return;
    }
    this.unfavEvent.emit(this.company.id);
    this.company.fav = false;
    this.apiRequestService.unfavCompany(this.company.id, this.userId).subscribe(data => {}), error => {
      this.company.fav = true;
      console.log(error);
    }
  }

}
