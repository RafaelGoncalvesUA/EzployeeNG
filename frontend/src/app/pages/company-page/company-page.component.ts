import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/classes/Company';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { lastValueFrom } from 'rxjs';

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
  async getCompanyById() {
    this.companyId = +this.route.snapshot.paramMap.get('id');

    if (this.companyId != undefined) {
      const aux$ = this.apiRequestService.getCompanyById(this.companyId);
      this.company = await lastValueFrom(aux$);
  
      if (this.company.logo != null)
        this.apiRequestService.getImage(this.company.logo).subscribe(data => this.createImageFromBlob(data));
      else
        this.logoImage = "assets/images/default_image.png";
    }
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.logoImage = reader.result, false);
 
    if (image)
       reader.readAsDataURL(image);
  }

}
