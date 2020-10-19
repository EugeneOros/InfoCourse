
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Course, FormOfClass } from '../../models/CourseElements';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @ViewChild('ratemessage', { static: false }) rateMessage: ElementRef;
  user: User;
  private course: Course = null;

  constructor(
    private authService: AuthenticationService,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.user = user)
    this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(course => this.course = course);
    if (this.course == null) {
      this.router.navigate(['404'])
    }
  }

  changeCourseRate(rate: number) {
    this.course.rating = rate;
    this.courseService.updateCourse(this.course);
  }

  addRatePart(uid: string) {
    this.course.rateList.push(uid);
    this.courseService.updateCourse(this.course);
  }



  onEnrollMe() {
    console.log()
    if (!this.isParticipant() && (this.course.partList.length < this.course.maxQuantity)) {
      this.course.partList.push(this.user.uid);
      console.log("course participant was added");
      this.courseService.updateCourse(this.course);
    } else {
      console.log("course participant was not added")
    }
  }
  onEdit() {
    this.router.navigate(['components/edit-course', this.course.id]);
  }



  isParticipant(): boolean {
    if (this.user && this.course.partList.includes(this.user.uid)) {
      return true;
    }
    return false;
  }

  noPlaces(): boolean {
    if ((!this.isParticipant()) && (!(this.course.partList.length < this.course.maxQuantity))) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.authService.canEdit(this.user)) {
      return true;
    }
    return false;
  }
}
