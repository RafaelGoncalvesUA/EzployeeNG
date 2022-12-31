import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { Input } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})


export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() fromOwner: boolean = false;
  companyLogo: any;

  constructor(private apiRequestService : ApiRequestsService) {}

  ngOnInit(): void {
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

}
