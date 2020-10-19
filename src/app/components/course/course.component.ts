import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/CourseElements';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})


export class CourseComponent implements OnInit {
  constructor(private authServise: AuthenticationService, private router: Router, private afs: AngularFirestore) { }


  @Input() course: Course;
  @Output() removeCourse = new EventEmitter<Course>();
  user: User;

  remove(event: Event) {
    event.stopPropagation();
    this.removeCourse.emit(this.course);
  }

  isAdmin(): boolean {
    if (this.authServise.canDelete(this.user)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.authServise.user$.subscribe(user => this.user = user)
  }


  showDetails() {
    this.router.navigate(['/components/course-details/', this.course.id]);
  }

}
