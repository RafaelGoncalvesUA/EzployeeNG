import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Offer } from 'src/app/classes/Offer';

@Component({
  selector: 'app-company-offers-page',
  templateUrl: './company-offers-page.component.html',
  styleUrls: ['./company-offers-page.component.css']
})
export class CompanyOffersPageComponent implements OnInit {

  company_id: number;
  offers: Offer[];
  
  constructor(
    private apiRequestsService: ApiRequestsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.company_id = +this.authService.getUserInfo().id;
    this.getCompanyOffers();
  }

  getCompanyOffers() {
    this.apiRequestsService.getOffersByCompany(this.company_id).subscribe(offers => {
      this.offers = offers;
    });
  }

}
