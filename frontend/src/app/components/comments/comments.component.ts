import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { Comment } from 'src/app/classes/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() companyId: number;
  comments: Comment[];

  constructor(private apiRequestService : ApiRequestsService) { }

  ngOnInit(): void {
    this.getComments();
  }
  
  getComments() {
    this.apiRequestService.getCommentsByCompany(this.companyId).subscribe(data => {
      this.comments = data;
    });
  }

}
