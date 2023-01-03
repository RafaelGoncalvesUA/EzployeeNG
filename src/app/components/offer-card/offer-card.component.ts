import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { Input, Output, EventEmitter } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})


export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() fromOwner: boolean = false;
  @Output() unfavEvent = new EventEmitter();
  companyLogo: any;
  userId: number;
  userType: string;

  constructor(
    private apiRequestService : ApiRequestsService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //check if user is logged in
    this.userId = this.authenticationService.loggedIn() ? +this.authenticationService.getUserInfo().id : undefined;
    this.userType = this.authenticationService.loggedIn() ? this.authenticationService.getUserInfo().type : undefined;


    this.getCompanyLogo();
  }


  //async para esperar pelo ultimo valor do observable
  getCompanyLogo() {
    if (this.offer.company['logo'] != null)
      this.apiRequestService.getImage(this.offer.company['logo']).subscribe(data => this.createImageFromBlob(data));
    else
      this.companyLogo = "assets/images/default_image.png";
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.companyLogo = reader.result, false);
 
    if (image)
      reader.readAsDataURL(image);
  }

  fav() {
    if (this.userId == undefined) {
      this.router.navigate(['/login']);
      return;
    }
    this.offer.fav = true;
    this.apiRequestService.favOffer(this.offer.id, this.userId).subscribe(data => {}), error => {
      this.offer.fav = false;
      console.log(error);
    }
  }

  unfav() {
    if (this.userId == undefined) {
      this.router.navigate(['/login']);
      return;
    }
    this.unfavEvent.emit(this.offer.id);
    this.offer.fav = false;
    this.apiRequestService.unfavOffer(this.offer.id, this.userId).subscribe(data => {}), error => {
      this.offer.fav = true;
      console.log(error);
    }
  }

}
