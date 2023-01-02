import { Component } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {
  
    offer: Offer;
    offerId: number;
    company: any;
  
    constructor(private apiRequestService : ApiRequestsService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.getOfferById();
    }

    getOfferById() {
      this.offerId = +this.route.snapshot.paramMap.get('id');

      this.apiRequestService.getOfferById(this.offerId).subscribe(offer => {
        this.offer = offer;
        this.company = offer.company;
      });
    
    }


}
