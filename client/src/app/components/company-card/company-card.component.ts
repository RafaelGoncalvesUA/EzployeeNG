import { Component } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})


export class CompanyCardComponent implements OnInit {

  @Input() company: Company | undefined;

  constructor(private apiRequestService : ApiRequestsService) {}

  ngOnInit() {}

}
