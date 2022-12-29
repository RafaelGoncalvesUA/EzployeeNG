import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Reply } from 'src/app/classes/Reply';
import { Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input() reply: Reply;
  user: User;
  isImageLoading: boolean = false;
  userPic: any;

  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
    this.getUserInfo(this.reply.user);
  }

  getUserInfo(id: number) {
    this.apiRequestService.getUserById(id).subscribe(data => {
      this.user = data;
      
      if (this.user.profile_pic != null) {
        this.apiRequestService.getImage(this.user.profile_pic).subscribe(data => {
          this.createImageFromBlob(data);
        }, error => {
          console.log(error);
        });
      }
      else
        this.userPic = "https://www.w3schools.com/howto/img_avatar.png";
    });
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.userPic = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
