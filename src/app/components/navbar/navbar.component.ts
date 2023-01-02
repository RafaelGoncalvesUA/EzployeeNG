import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  loggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.loggedIn();
  }

  logout() {
    sessionStorage.clear();
    this.loggedIn = false;
    window.location.reload();
  }

}
