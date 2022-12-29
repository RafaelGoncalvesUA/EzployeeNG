import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

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

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.apiRequestsService.getOffers().subscribe(offers => this.offers = offers);
  }

  filterOffers(filter: string) {
    console.log(filter);
  }

}
