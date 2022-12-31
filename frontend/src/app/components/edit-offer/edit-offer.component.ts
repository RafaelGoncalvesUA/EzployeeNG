import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/classes/Offer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  @Input() offer: Offer;
  company_id: number;
  editOfferForm: FormGroup;
  logo: boolean = false;
  validTitle: boolean = true;
  validLocation: boolean = true;
  validDescription: boolean = true;
  validSalary: boolean = true;
  validHours: boolean = true;
  validRole: boolean = true;
  validArea: boolean = true;
  validDate: boolean = true;
  validYearsXp: boolean = true;
  validWorkModel: boolean = true;
  validContractType: boolean = true;
  showForm: boolean = true;


  constructor(
    private apiRequestsService: ApiRequestsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.company_id = +this.authenticationService.getUserInfo().id;

    this.editOfferForm = new FormGroup({
      title: new FormControl(this.offer.title, [Validators.required]),
      description: new FormControl(this.offer.description, [Validators.required]),
      salary: new FormControl(this.offer.salary_h, [Validators.required]),
      hours: new FormControl(this.offer.hours_per_week, [Validators.required]),
      role: new FormControl(this.offer.role, [Validators.required]),
      area: new FormControl(this.offer.area, [Validators.required]),
      date: new FormControl(this.offer.date_expires, [Validators.required]),
      location: new FormControl(this.offer.location, [Validators.required]),
      years_xp: new FormControl(this.offer.years_xp, [Validators.required]),
      work_model: new FormControl(this.offer.work_model, [Validators.required]),
      contract_type: new FormControl(this.offer.contract_type, [Validators.required])
    });

  }

  onSubmit() {
    this.validTitle = this.editOfferForm.get('title').valid;
    this.validLocation = this.editOfferForm.get('location').valid;
    this.validDescription = this.editOfferForm.get('description').valid;
    this.validSalary = this.editOfferForm.get('salary').valid;
    this.validHours = this.editOfferForm.get('hours').valid;
    this.validRole = this.editOfferForm.get('role').valid;
    this.validArea = this.editOfferForm.get('area').valid;
    this.validDate = this.editOfferForm.get('date').valid;
    this.validYearsXp = this.editOfferForm.get('years_xp').valid;
    this.validWorkModel = this.editOfferForm.get('work_model').valid;
    this.validContractType = this.editOfferForm.get('contract_type').valid;

    if (this.editOfferForm.valid) {

      let formData = {
          company: this.company_id,
          title: this.editOfferForm.get('title').value,
          location: this.editOfferForm.get('location').value,
          description: this.editOfferForm.get('description').value,
          salary_h: this.editOfferForm.get('salary').value,
          hours_per_week: this.editOfferForm.get('hours').value,
          role: this.editOfferForm.get('role').value,
          area: this.editOfferForm.get('area').value,
          date: this.editOfferForm.get('date').value,
          years_xp: this.editOfferForm.get('years_xp').value,
          work_model: this.editOfferForm.get('work_model').value,
          date_expires: this.editOfferForm.get('date').value
        }

        //api call
        this.apiRequestsService.updateOffer(this.offer.id, formData).subscribe();
        this.showForm = false;
    }

  }

  reloadOffers() {
    window.location.reload();
  }

  deleteOffer() {
    this.apiRequestsService.deleteOffer(this.offer.id).subscribe(() => this.reloadOffers());
  }

}
