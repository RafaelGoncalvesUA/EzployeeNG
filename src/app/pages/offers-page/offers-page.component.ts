import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
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
  isValid: boolean = true;

  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService
    ) {
    this.offers = [];
  }

  ngOnInit() {

    //init form
    this.filterForm = new FormGroup({
      title: new FormControl(''),
      min: new FormControl(0),
      max: new FormControl(1000),
      order: new FormControl('0'),
      years1: new FormControl(true),
      years2: new FormControl(true),
      years3: new FormControl(true),
      years4: new FormControl(true),
      model1: new FormControl(true),
      model2: new FormControl(true),
      model3: new FormControl(true),
      type1: new FormControl(true),
      type2: new FormControl(true),
      type3: new FormControl(true)
    });

    // Get offers
    if (this.authenticationService.loggedIn()) {
      let userId = +this.authenticationService.getUserInfo().id;
      this.apiRequestsService.getOffers({user_id: userId}).subscribe(offers => {
        this.offers = offers;
        this.setupAutocomplete();
      });
    } else {
      this.apiRequestsService.getOffers().subscribe(offers => {
        this.offers = offers;
        this.setupAutocomplete();
      });
    }

  }

  getOffers() {
    this.apiRequestsService.getOffers().subscribe(offers => this.offers = offers);
  }

  // infinite string args
  onSubmit() {

    if (
      (
        this.filterForm.value['years1'] == false &&
        this.filterForm.value['years2'] == false &&
        this.filterForm.value['years3'] == false &&
        this.filterForm.value['years4'] == false
      ) ||
      (
        this.filterForm.value['model1'] == false &&
        this.filterForm.value['model2'] == false &&
        this.filterForm.value['model3'] == false
      ) ||
      (
        this.filterForm.value['type1'] == false &&
        this.filterForm.value['type2'] == false &&
        this.filterForm.value['type3'] == false
      )
    ){
      this.offers = [];
      this.isValid = false;
      return;
    }

    let filter = '';
    this.isValid = true;

    const yearsValues = {
      'years1': '0-3 anos',
      'years2': '3-5 anos',
      'years3': '5-10 anos',
      'years4': '10+ anos'
    }

    const modelValues = {
      'model1': 'Remoto',
      'model2': 'Presencial',
      'model3': 'Híbrido'
    }

    const typeValues = {
      'type1': 'Tempo inteiro',
      'type2': 'Meia jornada',
      'type3': 'Híbrido'
    }

    for(let i=1; i<=4; i++) {
      if(this.filterForm.value['years'+i]) {
        filter += 'years='+yearsValues['years'+i]+'&';
      }
    }

    for(let i=1; i<=3; i++) {
      if(this.filterForm.value['model'+i]) {
        filter += 'model='+modelValues['model'+i]+'&';
      }
    }

    for(let i=1; i<=3; i++) {
      if(this.filterForm.value['type'+i]) {
        filter += 'type='+typeValues['type'+i]+'&';
      }
    }

    filter += 'title='+this.filterForm.value.title+'&';
    filter += 'min='+this.filterForm.value.min+'&';
    filter += 'max='+this.filterForm.value.max+'&';
    filter += 'order='+this.filterForm.value.order+'&';

    if (this.authenticationService.loggedIn())
      filter += 'user_id=' + this.authenticationService.getUserInfo().id;
    this.apiRequestsService.getOffersByFilters(filter).subscribe(offers => this.offers = offers);

  }

  setupAutocomplete() {
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

}
