import { Component } from '@angular/core';
import { OnInit, Input } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {

  @Input() company: Company;
  addOfferForm: FormGroup;
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
    private apiRequestsService: ApiRequestsService
  ) { }

  ngOnInit() {

    this.addOfferForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      years_xp: new FormControl('0-3 anos', [Validators.required]),
      work_model: new FormControl('Remoto', [Validators.required]),
      contract_type: new FormControl('Tempo inteiro', [Validators.required])
    });

  }

  onSubmit() {
    this.validTitle = this.addOfferForm.get('title').valid;
    this.validLocation = this.addOfferForm.get('location').valid;
    this.validDescription = this.addOfferForm.get('description').valid;
    this.validSalary = this.addOfferForm.get('salary').valid;
    this.validHours = this.addOfferForm.get('hours').valid;
    this.validRole = this.addOfferForm.get('role').valid;
    this.validArea = this.addOfferForm.get('area').valid;
    this.validDate = this.addOfferForm.get('date').valid;
    this.validYearsXp = this.addOfferForm.get('years_xp').valid;
    this.validWorkModel = this.addOfferForm.get('work_model').valid;
    this.validContractType = this.addOfferForm.get('contract_type').valid;

    if (this.addOfferForm.valid) {

      let formData = {
          company: this.company.id,
          title: this.addOfferForm.get('title').value,
          location: this.addOfferForm.get('location').value,
          description: this.addOfferForm.get('description').value,
          salary_h: this.addOfferForm.get('salary').value,
          hours_per_week: this.addOfferForm.get('hours').value,
          role: this.addOfferForm.get('role').value,
          area: this.addOfferForm.get('area').value,
          date: this.addOfferForm.get('date').value,
          years_xp: this.addOfferForm.get('years_xp').value,
          work_model: this.addOfferForm.get('work_model').value,
          date_expires: this.addOfferForm.get('date').value
        }

        //api call
        this.apiRequestsService.addOffer(formData).subscribe();
        this.showForm = false;
    }

  }
}
