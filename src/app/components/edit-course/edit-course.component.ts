import { Component, OnInit } from '@angular/core';
import { Course, FormOfClass } from 'src/app/models/CourseElements';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  editForm: FormGroup;
  private course: Course = null;
  isCorrectForm: boolean = true;

  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCourse();
    this.editForm = new FormGroup({
      name: new FormControl(
        this.course.name, [
        Validators.required,
        Validators.minLength(1),
      ]
      ),
      ects: new FormControl(
        this.course.ECTS, [
        Validators.required,
      ]
      ),
      form: new FormControl(
        this.course.formsOfClass.toString(), [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]
      ),
      semestr: new FormControl(
        this.course.semestr, [
        Validators.required,
        Validators.min(1),
        Validators.max(15)
      ]
      ),
      quantity: new FormControl(
        this.course.maxQuantity, [
        Validators.required,
        Validators.min(2),
        Validators.max(300)
      ]
      ),
      img: new FormControl(this.course.imgPath, [])
    });
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(course => this.course = course);
    if (this.course == null) {
      this.router.navigate(['404'])
    }
  }

  displayErrorText() {
    if (this.isCorrectForm) {
      return 'none';
    }
    else {
      return 'block';
    }
  }

  onEdit(): void {
    if (this.editForm.valid) {
      this.courseService.updateCourse(this.course);
      var strArr: string[] = this.editForm.controls.form.value.toString().split(",");
      this.course.formsOfClass = [];
      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i] == "W" || strArr[i] == "Wykład")
          this.course.formsOfClass.push(FormOfClass.W);
        else if (strArr[i] == "C" || strArr[i] == "Ćwiczenia")
          this.course.formsOfClass.push(FormOfClass.C);
        else if (strArr[i] == "L" || strArr[i] == "Laboratoria")
          this.course.formsOfClass.push(FormOfClass.L);
        else if (strArr[i] == "P" || strArr[i] == "Praktyka")
          this.course.formsOfClass.push(FormOfClass.P);
        else {
          this.isCorrectForm = false;
          return;
        }
      }
      this.course.name = this.editForm.controls.name.value;
      this.course.ECTS = this.editForm.controls.ects.value;
      this.course.semestr = this.editForm.controls.semestr.value;
      this.course.maxQuantity = this.editForm.controls.quantity.value;
      if (this.editForm.controls.img.value.toString() != null) {
        this.course.imgPath = this.editForm.controls.img.value;
      } else {
        this.course.imgPath = '../../../assets/img/no-photo.png';
      }
      this.courseService.updateCourse(this.course);
      this.isCorrectForm = true;
      this.router.navigate(['/components/home/']);
    } else {
      this.isCorrectForm = false;
    }

  }
}
