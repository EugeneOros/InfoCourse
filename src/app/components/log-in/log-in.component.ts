import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private errorMessage: string = null;

  private email: string = null;
  private password: string = null;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authenticationService.eventAuthError$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  isError(): boolean {
    return this.errorMessage != null;
  }

  private loginUser(): void {
    this.authenticationService.LogIn(this.email, this.password);
  }


}
