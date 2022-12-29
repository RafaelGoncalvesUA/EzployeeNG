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

  @Input() company: Company;
  logoImage: any;
  isImageLoading: boolean = true;

  constructor(private apiRequestService : ApiRequestsService) {}

  ngOnInit() {
    if (this.company.logo != null)
      this.getImageFromService();
    else
      this.logoImage = "assets/images/default_image.png";
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.logoImage = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  
  getImageFromService() {
    if (this.company.logo != null) {
      this.isImageLoading = true;
      this.apiRequestService.getImage(this.company.logo).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    }
  }

}
