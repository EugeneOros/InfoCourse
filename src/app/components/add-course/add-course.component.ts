import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Course, FormOfClass } from 'src/app/models/CourseElements';
import { CoursesService } from 'src/app/services/courses.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})


export class AddCourseComponent implements OnInit {

  isOpenAddForm: boolean = false;
  addForm: FormGroup;
  newCourse: Course;
  isCorrectForm: boolean = true;

  constructor(private service: CoursesService) {
  }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(
        "", [
        Validators.required,
        Validators.minLength(1),
      ]
      ),
      ects: new FormControl(
        "", [
        Validators.required,
      ]
      ),
      form: new FormControl(
        "", [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]
      ),
      semestr: new FormControl(
        "", [
        Validators.required,
        Validators.min(1),
        Validators.max(15)
      ]
      ),
      quantity: new FormControl(
        "", [
        Validators.required,
        Validators.min(2),
        Validators.max(300)
      ]
      ),
      img: new FormControl()
    });
  }

  //-----------------------onSubmit----------------------
  createNewCourse(): void {
    this.newCourse = {
      name: null,
      ECTS: null,
      semestr: null,
      formsOfClass: null,
      maxQuantity: null,
      rating: null,
      id: null,
      imgPath: null,
      rateList: null,
      partList: null
    };
  }
  setCourseParameters(): void {
    var id = this.service.generateId();
    this.newCourse.id = id;
    this.newCourse.name = this.addForm.controls.name.value;
    this.newCourse.ECTS = this.addForm.controls.ects.value;
    this.newCourse.semestr = this.addForm.controls.semestr.value;
    this.newCourse.maxQuantity = this.addForm.controls.quantity.value;
    this.newCourse.rateList = [];
    this.newCourse.partList = [];
    if (this.addForm.controls.img.value != null) {
      this.newCourse.imgPath = this.addForm.controls.img.value;
    } else {
      this.newCourse.imgPath = '../../../assets/img/no-photo.png';
    }
    var strArr: string[] = this.addForm.controls.form.value.toString().split(",");
    this.newCourse.formsOfClass = [];
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i] == "W" || strArr[i] == "Wykład")
        this.newCourse.formsOfClass.push(FormOfClass.W);
      else if (strArr[i] == "C" || strArr[i] == "Ćwiczenia")
        this.newCourse.formsOfClass.push(FormOfClass.C);
      else if (strArr[i] == "L" || strArr[i] == "laboratoria")
        this.newCourse.formsOfClass.push(FormOfClass.L);
      else if (strArr[i] == "P" || strArr[i] == "Praktyka")
        this.newCourse.formsOfClass.push(FormOfClass.P);
      else {
        this.isCorrectForm = false;
      }
    }

  }
  onSubmit() {
    if (this.addForm.valid) {
      this.isCorrectForm = true;
      this.createNewCourse();
      this.setCourseParameters();
      this.service.addCourse(this.newCourse);
      this.closeAddForm();
      this.addForm.reset();
    } else {
      this.isCorrectForm = false;
    }

  }
  //------------------Others-----------------------------

  displayErrorText() {
    if (this.isCorrectForm) {
      return 'none';
    }
    else {
      return 'block';
    }
  }
  setTransformAddForm() {
    if (this.isOpenAddForm) {
      return 'scaleY(1)';
    } else {
      return "scaleY(0)";
    }
  }
  setTansformAddButton() {
    if (this.isOpenAddForm) {
      return 'scaleY(0)';
    } else {
      return "scaleY(1)";
    }
  }

  openAddForm() {
    this.isOpenAddForm = true;
  }

  closeAddForm() {
    this.isOpenAddForm = false;

  }
}
