import { Component } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  filterForm: FormGroup;
  companies: Company[] = undefined;
  names: any;
  
  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {

    //initiliaze filter form
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl('0'),
      order: new FormControl('0')
    });

    //get companies
    if (this.authenticationService.loggedIn()) {
      let userId = +this.authenticationService.getUserInfo().id;
      this.apiRequestsService.getCompanies({user_id: userId}).subscribe(companies => {
        this.companies = companies;
        this.setupAutocomplete();
      });
    } else {
      this.apiRequestsService.getCompanies().subscribe(companies => {
        this.companies = companies
        this.setupAutocomplete();
      });
    }

  }
  
  setupAutocomplete() {
    //autocomplete
    let names = this.names = this.companies.map(company => company.name);
    names.sort();
    $('#name').autocomplete({
      source: function(request, response) {
        let results = $.ui.autocomplete.filter(names, request.term);
        response(results.slice(0, 10));
      }
    });
  }
  
  onSubmit() {
    this.companies = undefined;
    
    let filters = {
      "name": this.filterForm.get('name').value,
      "rating": this.filterForm.get('rating').value,
      "order": this.filterForm.get('order').value
    };

    this.apiRequestsService.getCompanies(filters).subscribe(companies => this.companies = companies);
  }
    
}
