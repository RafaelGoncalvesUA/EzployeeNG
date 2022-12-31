import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { Input } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})


export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() fromOwner: boolean = false;

  constructor(private apiRequestService : ApiRequestsService) {}

  ngOnInit() {}

}
