import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit {

  companyId: number;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.companyId = +this.authService.getUserInfo().id;
  }

}
