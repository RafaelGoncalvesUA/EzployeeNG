import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Company } from 'src/app/classes/Company';
import { Offer } from 'src/app/classes/Offer';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myfavorites-page',
  templateUrl: './myfavorites-page.component.html',
  styleUrls: ['./myfavorites-page.component.css']
})
export class MyfavoritesPageComponent {

  companies: Company[];
  offers: Offer[];
  userId: number;

  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.companies = [];
    this.offers = [];
  }

  ngOnInit() {
    if (!this.authenticationService.loggedIn()) {
      this.router.navigate(['/login']);
    }
    
    this.userId = +this.authenticationService.getUserInfo().id;
    this.apiRequestsService.getFavCompanies(this.userId).subscribe(companies => this.companies = companies);
    this.apiRequestsService.getFavOffers(this.userId).subscribe(offers => this.offers = offers);
  }

  refreshCompanies(company_id: number) {
    this.companies = this.companies.filter(company => company.id != company_id);
  }

  refreshOffers(offer_id: number) {
    this.offers = this.offers.filter(offer => offer.id != offer_id);
  }

}
