import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Offer } from 'src/app/classes/Offer';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {

  offers: Offer[];

  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService
    ) {
    this.offers = [];
  }

  ngOnInit() {

    // Get offers
    if (this.authenticationService.loggedIn()) {
      let userId = +this.authenticationService.getUserInfo().id;
      this.apiRequestsService.getOffers({user_id: userId}).subscribe(offers => this.offers = offers);
    } else {
      this.apiRequestsService.getOffers().subscribe(offers => this.offers = offers);
    }

    // Autocomplete
    let titles = this.offers.map(company => company.title);
    titles.sort();
    $('#title').autocomplete({
      source: function(request, response) {
        let results = $.ui.autocomplete.filter(titles, request.term);
        response(results.slice(0, 10));
      }
    });
  }

  getOffers() {
    this.apiRequestsService.getOffers().subscribe(offers => this.offers = offers);
  }

  filterOffers(filter: string) {
    console.log(filter);
  }

}
