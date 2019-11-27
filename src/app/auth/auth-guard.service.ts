import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{
    constructor(private authService: AuthService, 
                private router: Router,
                private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | 
        UrlTree | 
        Observable<boolean | UrlTree> {
        
        return this.store.select('auth').pipe(
            map(data => {
                const user = data.user;
                if(user){
                    return true;
                }else{
                    return this.router.createUrlTree(['/auth']);
                }
             })
        );
    }
}