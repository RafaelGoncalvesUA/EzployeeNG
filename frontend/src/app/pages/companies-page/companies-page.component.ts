import { Component } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { lastValueFrom } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  companies: Company[] = [];
  
  constructor(private apiRequestsService: ApiRequestsService) { }

  async ngOnInit() {  
    const response$ = this.apiRequestsService.getCompanies()
    this.companies = await lastValueFrom(response$);
    let names = this.companies.map(company => company.name);
    names.sort();
    $('#name').autocomplete({
      source: function(request, response) {
        let results = $.ui.autocomplete.filter(names, request.term);
        response(results.slice(0, 10));
      }
    });
  }

  filterCompanies(name: string, rating: string, order: string) {

    let filters = {
      "name": name,
      "rating": rating,
      "order": order
    };

    this.apiRequestsService.getCompanies(filters).subscribe(companies => this.companies = companies);
  }
    
}
