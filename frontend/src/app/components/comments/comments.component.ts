import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Comment } from 'src/app/classes/Comment';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() companyId: number;
  comments: Comment[];
  ableToComment: boolean = false;

  constructor(
    private apiRequestService : ApiRequestsService,
    private authService: AuthenticationService,
    private commentsService: CommentsService
    ) { }

  ngOnInit(): void {

    //check if current user can comment
    if (this.authService.loggedIn() && this.authService.getUserInfo().type == 'user')
      this.ableToComment = true;

    this.getComments();

  }
  
  getComments() {
    this.apiRequestService.getCommentsByCompany(this.companyId).subscribe(data => {
      this.comments = data;
    });
  }

}
