import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private errorMessage: string;
  private userName: string;
  private userSurname: string;
  private email: string;
  private password: string;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  isError(): boolean {
    return this.errorMessage != null;
  }

  ngOnInit() {
    this.authenticationService.eventAuthError$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  private signupUser(): void {
    this.authenticationService.SignUp(this.email, this.password, this.userName, this.userSurname);
  }
}
