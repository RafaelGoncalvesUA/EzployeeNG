import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/classes/Company';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {
  companyId: number;
  company: Company;
  logoImage: any;

  constructor(private route: ActivatedRoute, private apiRequestService : ApiRequestsService) {

  }

  ngOnInit(): void {
    this.getCompanyById();
  }


  //async para esperar pelo ultimo valor do observable
  getCompanyById() {
    this.companyId = +this.route.snapshot.paramMap.get('id');
    this.apiRequestService.getCompanyById(this.companyId).subscribe(data => this.company = data);
  }

}
