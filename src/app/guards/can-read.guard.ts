import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tap, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {
  constructor(private auth: AuthenticationService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content')
          this.router.navigate(['components/log-in'])
        }
      })
    );
  }
}