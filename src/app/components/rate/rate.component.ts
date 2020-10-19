import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, AfterViewInit {
  @Input() generalRate: number;
  @Input() rateList: string[];
  @Output() changeCourseRate = new EventEmitter<number>();
  @Output() addRatePart = new EventEmitter<string>();
  user: firebase.User;
  stars = [];

  @ViewChild('firstStar', { static: false }) firstStar: ElementRef;
  @ViewChild('secondStar', { static: false }) secondStar: ElementRef;
  @ViewChild('thirdStar', { static: false }) thirdStar: ElementRef;
  @ViewChild('fourthStar', { static: false }) fourthStar: ElementRef;
  @ViewChild('fifthStar', { static: false }) fifthStar: ElementRef;

  ngAfterViewInit() {
    this.stars.push(this.firstStar);
    this.stars.push(this.secondStar);
    this.stars.push(this.thirdStar);
    this.stars.push(this.fourthStar);
    this.stars.push(this.fifthStar);
    this.displayStars(this.generalRate);
  }

  setStars(newUserRate: number): void {
    if (this.user) {
      this.displayStars(this.changeRate(newUserRate));
    }
  }

  private changeRate(newUserRate: number): number {
    let changedRate: number = this.generalRate;
    let partCount: number = this.rateList.length;
    if (this.rateList.includes(this.user.uid.toString())) {
      console.log('user has already rated');
      return this.generalRate;
    } else {
      this.addRatePart.emit(this.user.uid.toString());
      changedRate = ((changedRate * partCount) + newUserRate) / (++partCount);
      this.changeCourseRate.emit(changedRate);
      return changedRate;
    }

  }

  private displayStars(rate: number) {
    if (rate > 5) return;
    for (let star of this.stars) {
      if (rate >= 0.75) {
        star.nativeElement.src = "../../../assets/img/starFull.png"
      } else if (rate >= 0.25) {
        star.nativeElement.src = "../../../assets/img/starHalf.png"
      } else {
        star.nativeElement.src = "../../../assets/img/starEmpty.png"
      }
      rate -= 1;
    }
  }

  userRated(): boolean {
    if (!this.user) return false;
    if (this.rateList.includes(this.user.uid.toString()))
      return true;
    return false;
  }

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserState()
      .subscribe(user => {
        this.user = user;
      })

  }

}
