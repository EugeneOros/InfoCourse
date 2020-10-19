import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: firebase.User;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authenticationService.getUserState()
      .subscribe(user => {
        this.user = user;
      })
  }

  getUID() {
    if ('1icv6htT3WSsjOFTzzhc55xhlsH2' == this.user.uid)
      console.log('fadadfa');
    return this.user.uid;
  }

  logout() {
    this.authenticationService.SignOut();
  }
}
