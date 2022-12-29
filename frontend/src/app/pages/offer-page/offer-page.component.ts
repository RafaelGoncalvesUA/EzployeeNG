import { Component } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/classes/Company';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {
  
    offer: Offer;
    offerId: number;
    company: Company;
  
    constructor(private apiRequestService : ApiRequestsService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.getOfferById();
    }

    async getOfferById() {
      this.offerId = +this.route.snapshot.paramMap.get('id');

      if (this.offerId != undefined) {
        const offerDetails$ = this.apiRequestService.getOfferById(this.offerId);
        this.offer = await lastValueFrom(offerDetails$);
  
        const companyDetails$ = this.apiRequestService.getCompanyById(this.offer.company);
        this.company = await lastValueFrom(companyDetails$);
      }
    }


}
