import { Component, OnInit } from '@angular/core';
import { Course, FormOfClass } from 'src/app/models/CourseElements';
import { CoursesData } from 'src/app/data/courses-data';
import { CourseComponent } from '../course/course.component';
import { CoursesService } from 'src/app/services/courses.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent implements OnInit {

  searchTerm: string;
  searchTermECTS: string;
  searchTermSemester: string;
  searchTermRate: string;
  user: User;
  courses: Course[];

  constructor(private service: CoursesService, private authServise: AuthenticationService) {
  }



  ngOnInit() {
    this.service.getCoursesRef().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.courses = products;
    });
    this.authServise.user$.subscribe(user => this.user = user)
  }

  isAdmin(): boolean {
    if (this.authServise.canEdit(this.user)) {
      return true;
    }
    return false;
  }

  removeCourseFromList(courseToDelete: Course): void {
    this.courses.forEach(function (course, index, all) {
      if (courseToDelete.id == course.id) all.splice(index, 1);
    });
    this.service.deleteCourse(courseToDelete.id);
  }


}













// private getCourses(): void {
//   this.courses = this.service.getCourses();
// }