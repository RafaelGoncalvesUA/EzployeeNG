import { Component } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent {
  
    constructor(private apiRequestsService: ApiRequestsService) { }

    getCompanies(): void {
      this.apiRequestsService.getCompanies().subscribe((data: any) => {
        console.log(data);
      });
    }

}
