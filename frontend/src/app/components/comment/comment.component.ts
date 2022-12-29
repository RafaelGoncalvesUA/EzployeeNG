import { Component } from '@angular/core';
import { Comment } from 'src/app/classes/Comment';
import { Reply } from 'src/app/classes/Reply';
import { Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { User } from 'src/app/classes/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() commentDeleted = new EventEmitter<boolean>();
  user: User = null;
  replies: Reply[];
  userPic: any;
  isImageLoading: boolean = false;
  replyBox: boolean = false;
  ableToReply: boolean = false;
  ableToDelete: boolean = false;
  
  constructor(
    private apiRequestService : ApiRequestsService,
    private authService: AuthenticationService,
    ) { }

  ngOnInit(): void {

    //check user permissions
    if (this.authService.loggedIn()) {
      if (this.authService.getUserInfo().type != 'company')
        this.ableToReply = true;

      if (this.authService.getUserInfo().type == 'company' && +this.authService.getUserInfo().id == this.comment.company)
        this.ableToDelete = true;
    }

    this.getUserInfo(this.comment.user);
    this.getReplies();
  }

  getReplies() {
    this.apiRequestService.getRepliesByComment(this.comment.id).subscribe(data => this.replies = data);
  }

  getUserInfo(id: number) {
    this.apiRequestService.getUserById(id).subscribe(data => {
      this.user = data;
      
      if (this.user.profile_pic != null)
        this.apiRequestService.getImage(this.user.profile_pic).subscribe(data => this.createImageFromBlob(data));
      else
        this.userPic = "https://www.w3schools.com/howto/img_avatar.png";
    });
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => this.userPic = reader.result, false);
    
    if (image)
       reader.readAsDataURL(image);
  }

  showReplyBox() {
    this.replyBox = !this.replyBox;
  }

  reload() {
    this.getReplies();
  }

  deleteComment() {
    this.apiRequestService.deleteComment(this.comment.id).subscribe();
    
    //notify parent
    this.commentDeleted.emit(true);
  }

}
