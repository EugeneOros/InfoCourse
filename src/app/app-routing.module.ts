import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AdminGuard } from './guards/admin.guard';
import { CanReadGuard } from './guards/can-read.guard';

const routes: Routes = [
  { path: 'components/home', component: HomeComponent },
  { path: 'components/log-in', component: LogInComponent },
  { path: 'components/sign-up', component: SignUpComponent },
  { path: 'components/edit-course/:id', component: EditCourseComponent, canActivate: [AdminGuard] },
  { path: 'components/course-details/:id', component: CourseDetailsComponent, canActivate: [CanReadGuard] },
  { path: '', redirectTo: 'components/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  CourseDetailsComponent,
  PageNotFoundComponent,
  HomeComponent
]