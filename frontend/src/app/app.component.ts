import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    //console.log(this.authenticationService.loggedIn());
  }
}
