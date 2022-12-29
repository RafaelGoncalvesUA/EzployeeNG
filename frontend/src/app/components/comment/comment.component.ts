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
  user: User;
  replies: Reply[];
  
  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
    this.getUser(this.comment.user);
    this.getReplies();
  }

  getReplies() {
    this.apiRequestService.getRepliesByComment(this.comment.id).subscribe(data => {
      this.replies = data;
    });
  }

  getUser(id: number) {
    //TODO: API call to get user by id
    this.user = {id: 1, first_name: "John", last_name: "Doe", email: "john@gmail.com", profile_pic: "https://www.w3schools.com/howto/img_avatar.png"};
  }



}
