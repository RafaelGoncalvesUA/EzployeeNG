import { Input, Output, EventEmitter, Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Comment } from 'src/app/classes/Comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply-area',
  templateUrl: './reply-area.component.html',
  styleUrls: ['./reply-area.component.css']
})
export class ReplyAreaComponent {
  @Input() comment: Comment;
  @Output() replyPosted = new EventEmitter<boolean>();
  replyForm: FormGroup;
  currentRating: number = 1;
  validForm: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private commentsService: CommentsService,
    ) { }

  ngOnInit(): void {

    this.replyForm = new FormGroup({
      reply: new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    this.validForm = this.replyForm.valid;

    if (this.validForm) {
      let header = {
        comment: +this.comment.id,
        text: this.replyForm.value.reply,
        user: +this.authService.getUserInfo().id,
        company: this.comment.company
      }

      //post comment via api
      this.commentsService.postReply(header).subscribe();

      //notify parent component: comment
      this.replyPosted.emit(true);

      //reset form
      this.replyForm.reset();
    }
  }

}
