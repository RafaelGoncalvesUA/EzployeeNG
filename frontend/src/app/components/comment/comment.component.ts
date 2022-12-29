import { Component } from '@angular/core';
import { Comment } from 'src/app/classes/Comment';
import { Reply } from 'src/app/classes/Reply';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  user: User = null;
  replies: Reply[];
  userPic: any;
  isImageLoading: boolean = false;
  replyBox: boolean = false;
  
  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
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

}
