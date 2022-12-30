import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Company } from 'src/app/classes/Company';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  @Input() company: Company;
  logoImage: any;

  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
    this.getCompanyLogo();
  }


  //async para esperar pelo ultimo valor do observable
  async getCompanyLogo() {
    if (this.company.logo != null)
      this.apiRequestService.getImage(this.company.logo).subscribe(data => this.createImageFromBlob(data));
    else
      this.logoImage = "assets/images/default_image.png";
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.logoImage = reader.result, false);
 
    if (image)
      reader.readAsDataURL(image);
  }

}