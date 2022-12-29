import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Comment } from 'src/app/classes/Comment';
import { FormControl, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.css']
})
export class CommentAreaComponent {

  @Input() companyId: number;
  comments: Comment[];
  writeCommentForm: FormGroup;
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

    this.writeCommentForm = new FormGroup({
      comment: new FormControl('')
    });

  }
  
  getComments() {
    this.apiRequestService.getCommentsByCompany(this.companyId).subscribe(data => {
      this.comments = data;
    });
  }

  onSubmit() {
    let comment = this.writeCommentForm.value.comment;

    //post comment via api
    // this.commentsService.postComment({
    //   id: this.authService.getUserInfo().id,
    //   company_id: this.companyId,
    //   comment: comment
    // });


    //clean form
    this.writeCommentForm.reset();
  }

  updateRating(rating: number) {
    console.log(rating);
  }


}
