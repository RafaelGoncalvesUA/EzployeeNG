import { Component } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { lastValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  filterForm: FormGroup;
  companies: Company[] = [];
  
  constructor(private apiRequestsService: ApiRequestsService) { }

  async ngOnInit() {

    //initiliaze filter form
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl('0'),
      order: new FormControl('0')
    });

    //get companies
    const response$ = this.apiRequestsService.getCompanies()
    this.companies = await lastValueFrom(response$);

    //autocomplete
    let names = this.companies.map(company => company.name);
    names.sort();
    $('#name').autocomplete({
      source: function(request, response) {
        let results = $.ui.autocomplete.filter(names, request.term);
        response(results.slice(0, 10));
      }
    });
  }

  onSubmit() {
    let filters = {
      "name": this.filterForm.get('name').value,
      "rating": this.filterForm.get('rating').value,
      "order": this.filterForm.get('order').value
    };

    this.apiRequestsService.getCompanies(filters).subscribe(companies => this.companies = companies);
  }
    
}
