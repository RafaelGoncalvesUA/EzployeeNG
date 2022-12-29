import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Comment } from 'src/app/classes/Comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.css']
})
export class CommentAreaComponent {

  @Input() companyId: number;
  @Output() commentPosted = new EventEmitter<boolean>();
  comments: Comment[];
  writeCommentForm: FormGroup;
  currentRating: number = 1;
  validForm: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private commentsService: CommentsService,
    ) { }

  ngOnInit(): void {

    this.writeCommentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    this.validForm = this.writeCommentForm.valid;

    if (this.validForm) {
      let header = {
        text: this.writeCommentForm.value.comment,
        rating: this.currentRating,
        user: +this.authService.getUserInfo().id,
        company: this.companyId
      }

      //post comment via api
      this.commentsService.postComment(header).subscribe();

      //notify parent component
      this.commentPosted.emit(true);

      //reset form
      this.writeCommentForm.reset();
    }
  }

  updateRating(rating: number) {
    this.currentRating = rating;
  }

}
