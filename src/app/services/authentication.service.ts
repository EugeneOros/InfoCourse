import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/switchMap';






@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user$: Observable<User>;
  newUser: any;

  private eventAuthError = new BehaviorSubject<string>('');
  public eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private database: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.database.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  LogIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.eventAuthError.next(null);
        console.log('You are Successfully logged in!');
        this.router.navigate(['components/home']);
      })
      .catch(err => {
        this.eventAuthError.next(err);
        console.log('Something is wrong:', err.message);
      });
  }

  SignUp(email: string, password: string, userName: string, userSurname: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.newUser = {
          uid: userCredential.user.uid,
          name: userName,
          surname: userSurname,
          email: email,
          role: {
            admin: false,
            reader: true,
            edytor: false
          }
        }
        userCredential.user.updateProfile({
          displayName: this.newUser.name + " " + this.newUser.surname
        });
        this.addUserToDB(userCredential)
          .then(() => {
            this.router.navigate(['components/home']);
            this.eventAuthError.next(null);
            console.log('You are Successfully signed up!', userCredential);
          });

      })
      .catch(err => {
        this.eventAuthError.next(err);
        console.log('Something is wrong:', err.message);
      });
  }

  SignOut() {
    this.afAuth.auth.signOut();
  }


  getUserState() {
    return this.afAuth.authState;
  }


  addUserToDB(userCredential: firebase.auth.UserCredential) {
    return this.database.doc(`Users/${userCredential.user.uid}`)
      .set({
        uid: this.newUser.uid,
        name: this.newUser.name,
        surname: this.newUser.surname,
        email: this.newUser.email,
        role: {
          admin: false,
          reader: true,
          edytor: false
        }
      })
  }



  canRead(user: User): boolean {
    const allowed = ['admin', 'edytor', 'reader'];
    return this.checkAuthorization(user, allowed);
  }


  canEdit(user: User): boolean {
    const allowed = ['admin', 'edytor'];
    return this.checkAuthorization(user, allowed);
  }


  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const rol of allowedRoles) {
      if (user.role[rol]) { return true; }
    }
  }
}



