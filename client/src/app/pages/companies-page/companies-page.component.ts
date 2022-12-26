import { Component } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  companies: Company[] = [];
  
  constructor(private apiRequestsService: ApiRequestsService) { }

  ngOnInit() {
    this.apiRequestsService.getCompanies().subscribe(companies => this.companies = companies);
  }
    
}
