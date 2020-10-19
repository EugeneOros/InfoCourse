import { Injectable, OnInit } from '@angular/core';
import { Course } from '../models/CourseElements';
import { CoursesData } from '../data/courses-data';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements OnInit {

  private dbPath = '/Courses';
  coursesRef: AngularFirestoreCollection<Course> = null;
  private courses: Course[];

  ngOnInit(): void {
    this.updateCourses();
  }

  constructor(private db: AngularFirestore) {
    this.coursesRef = db.collection(this.dbPath);
    this.updateCourses();
  }

  public generateId(): number {
    var maxId = 0;
    if (this.courses != null) {
      for (let c of this.courses) {
        if (c.id > maxId) maxId = c.id;
      }
    }
    return maxId + 1;
  }


  getCoursesRef(): AngularFirestoreCollection<Course> {
    return this.coursesRef;
  }

  public getCourses() {
    return this.courses;
  }

  private updateCourses() {
    this.getCoursesRef().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.courses = products;
    });
  }


  getCourse(id: number): Observable<Course> {
    this.updateCourses();
    return of(this.courses.find(course => course.id == id));
  }

  updateCourse(course: Course) {
    this.coursesRef.doc(course.id + "").set({ ...course });
  }

  addCourse(course: Course): void {
    this.coursesRef.doc(course.id + "").set({ ...course });
  }

  deleteCourse(id: number) {
    this.db.collection('Courses').doc(id.toString()).delete();
  }

}

















 // public addCourse(course: Course): void {
  //   this.db.collection("Courses").doc(course.id.toString()).set({
  //     neme: course.name,
  //     id: course.id,
  //     ECTS: course.ECTS,
  //     maxQuantity: course.maxQuantity,
  //     semestr: course.semestr,
  //     rating: course.rating,
  //     imgPath: course.imgPath,
  //     rateList: course.rateList,
  //     partList: course.partList,
  //     formOfClass: course.formsOfClass
  //   })

  //   this.courses.push(course);
  // }






 // initDb() {
  //   this.createProduct(new Course({ ECTS: 10, semestr: 3, rating: 3, rateList: [], partList: [], name: "rola Moto Z4", id: 899, maxQuantity: 10, imgPath: "https://ss7.vzw.com/is/image/VerizonWireless/motorola-moto-z4-black?$png8alpha256$&hei=520", formsOfClass: "Wykład" }));
  //   this.createProduct(new Course({ ECTS: 10, semestr: 3, rating: 3, rateList: [], partList: [], name: "Phone 8", id: 2566, maxQuantity: 8, imgPath: "https://ss7.vzw.com/is/image/VerizonWireless/iPhone8-Svr?$png8alpha256$&hei=520", formsOfClass: "Wykład" }));
  //   this.createProduct(new Course({ ECTS: 10, semestr: 3, rating: 3, rateList: [], partList: [], name: "amsung Galaxy S10", id: 3599, maxQuantity: 4, imgPath: "https://ss7.vzw.com/is/image/VerizonWireless/SamsungGalaxyS10_Blue?$png8alpha256$&hei=520", formsOfClass: "Wykład" }));
  // }