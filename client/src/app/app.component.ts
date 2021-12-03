import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }
  title = 'angular-doctor';
  isAuthenticated = false;
  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

}
