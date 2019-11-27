import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService,
                private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next:HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            exhaustMap(data => {
                const user = data.user;
                if(user){
                    const modifiedReq = req.clone({
                        params: new HttpParams().append('auth', user.token)
                    });
                    return next.handle(modifiedReq);
                }else{
                    return next.handle(req);
                }
            })
        );
    }

}