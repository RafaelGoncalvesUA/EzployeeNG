import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Reply } from 'src/app/classes/Reply';
import { Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/User';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input() reply: Reply;
  @Input() companyId: number;
  @Output() replyDeleted = new EventEmitter<boolean>();
  ableToDelete: boolean = false;
  userPic: any;

  constructor(private apiRequestService : ApiRequestsService,
    private authService: AuthenticationService,
    private commentsService: CommentsService
    ) { }

  ngOnInit(): void {
    
    //check permissions
    if (this.authService.loggedIn()) {
      let userInfo = this.authService.getUserInfo();

      if (userInfo.type == 'company' && +userInfo.id == this.companyId)
        this.ableToDelete = true;
    }
    
    this.getUserPic();
  }

  getUserPic() {
    if (this.reply.img_url != null)
      this.apiRequestService.getImage(this.reply.img_url).subscribe(data => this.createImageFromBlob(data));
    else
      this.userPic = "https://www.w3schools.com/howto/img_avatar.png";
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.userPic = reader.result, false);
    
    if (image)
       reader.readAsDataURL(image);
  }


  deleteReply() {
    this.commentsService.deleteReply(this.reply.id).subscribe(data => this.replyDeleted.emit(true));
  }

}
