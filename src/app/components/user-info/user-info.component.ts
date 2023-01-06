import { Component } from '@angular/core';
import { OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { ApiRequestsService } from 'src/app/services/api-requests.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  profilePic: any;

  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
    this.getCompanyLogo();
  }


  //async para esperar pelo ultimo valor do observable
  async getCompanyLogo() {
    if (this.user.profile_pic != null) {
      this.profilePic = "https://rafego16.pythonanywhere.com/" + this.user.profile_pic;
      // this.apiRequestService.getImage(this.user.profile_pic).subscribe(data => this.createImageFromBlob(data));
    }
    else
      this.profilePic = "assets/images/default_image.png";
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.profilePic = reader.result, false);
 
    if (image)
      reader.readAsDataURL(image);
  }

}