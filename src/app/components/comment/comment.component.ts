import { Component } from '@angular/core';
import { Comment } from 'src/app/classes/Comment';
import { Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() commentDeleted = new EventEmitter<boolean>();
  userPic: any;
  replyBox: boolean = false;
  ableToReply: boolean = false;
  ableToDelete: boolean = false;
  
  constructor(
    private apiRequestService : ApiRequestsService,
    private commentsService: CommentsService,
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {

    //check user permissions
    if (this.authService.loggedIn()) {
      if (this.authService.getUserInfo().type != 'company')
        this.ableToReply = true;

      if (this.authService.getUserInfo().type == 'company' && +this.authService.getUserInfo().id == this.comment.company)
        this.ableToDelete = true;
    }

    this.getUserPic();
  }

  getUserPic() {
    if (this.comment.img_url != null) {
      this.userPic = "https://rafego16.pythonanywhere.com/" + this.comment.img_url;
      // this.apiRequestService.getImage(this.comment.img_url).subscribe(data => this.createImageFromBlob(data));
    }
    else
      this.userPic = "https://www.w3schools.com/howto/img_avatar.png";
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
    //get recent replies
    this.commentsService.getRepliesByComment(this.comment.id).subscribe(replies => {
      this.comment.replies = replies;
      this.getUserPic();
    });

    this.replyBox = false;
  }

  deleteComment() {
    this.commentsService.deleteComment(this.comment.id).subscribe();

    //notify parent
    this.commentDeleted.emit(true);
  }

}
