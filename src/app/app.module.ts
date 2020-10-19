import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild, ElementRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RateComponent } from './components/rate/rate.component';
import { SearchPipe } from './components/courses-list/course-filter.pipe';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { SearchPipeECTS } from './components/courses-list/course-filterECTS.pipe';
import { SearchPipeRate } from './components/courses-list/course-filterRate.pipe';
import { SearchPipeSemester } from './components/courses-list/course-filterSemester.pipe';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditCourseComponent } from './components/edit-course/edit-course.component';



@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CoursesListComponent,
    AddCourseComponent,
    RateComponent,
    SearchPipe,
    SearchPipeECTS,
    SearchPipeRate,
    SearchPipeSemester,
    CourseDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
    LogInComponent,
    SignUpComponent,
    EditCourseComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule, // do obslugi baz danych
    AngularFireDatabaseModule, // do obslugi baz danych
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
