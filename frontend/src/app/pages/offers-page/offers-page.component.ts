import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Offer } from 'src/app/classes/Offer';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

declare var $: any;

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {

  offers: Offer[];

  constructor(private apiRequestsService: ApiRequestsService) {
    this.offers = [];
  }

  async ngOnInit() {
    const response$ = this.apiRequestsService.getOffers();
    this.offers = await lastValueFrom(response$);
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
