import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { filter, lastValueFrom } from 'rxjs';
import { Offer } from 'src/app/classes/Offer';
import { FormControl, FormGroup } from '@angular/forms';
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
  filterForm: FormGroup;

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

  // infinite string args
  onSubmit() {
    let filters = {
      "title": this.filterForm.get('title').value,
      "min": this.filterForm.get('min').value,
      "max": this.filterForm.get('max').value,
      "order": this.filterForm.get('order').value
    };
    years_opts = ["0_3", "3_5", "5_10", "10_"]
    work_models_opts = ["remoto", "presencial", "hibrido"]
    contract_types_opts = ["..."]
    


    this.apiRequestsService.getOffers(filters).subscribe(offers => this.offers = offers);

  }

}
