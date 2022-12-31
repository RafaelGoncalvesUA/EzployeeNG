import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Comment } from 'src/app/classes/Comment';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() companyId: number;
  @Input() fromReservedArea: boolean = false;
  comments: Comment[];
  ableToComment: boolean = false;

  constructor(
    private apiRequestService : ApiRequestsService,
    private authService: AuthenticationService,
    ) { }

  ngOnInit(): void {
    //check if current user can comment
    if (this.authService.loggedIn()) {
      if (this.authService.getUserInfo().type == 'company')
      this.ableToComment = false;
      else if (this.authService.getUserInfo().type == 'user')
      this.ableToComment = true;
      
    }
    this.getComments();
  }
  
  getComments() {
    this.apiRequestService.getCommentsByCompany(this.companyId).subscribe(data => {
      this.comments = data;
    });
  }

  reload() {
    setTimeout(() => this.getComments(), 1000);
  }

  reloadAfterDelete() {
    setTimeout(() => this.getComments(), 1000);
  }

}
