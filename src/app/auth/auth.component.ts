import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    @ViewChild('authForm')
    authForm : NgForm;
    isLogin =true;
    error = null;
    isLoading = false;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(){

    }

    onModeSwitch(){
        this.isLogin = !this.isLogin;
    }

    onSubmit(){
        this.isLoading = true;

        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
        
        var authResponseObs : Observable<AuthResponseData>;

        if(this.isLogin){
            authResponseObs = this.authService.logIn(email, password);
        }else{
            authResponseObs = this.authService.signUp(email, password);
        }

        authResponseObs.subscribe((response:AuthResponseData) => {
            console.log(response);
            this.error = null;
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            this.error = error;
            this.isLoading = false;
        });

        this.authForm.reset();
    }
}