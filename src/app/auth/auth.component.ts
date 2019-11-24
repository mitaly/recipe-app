import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoggingService } from '../logging.service';
@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    @ViewChild('authForm')
    authForm : NgForm;
    isLogin =true;
    error = null;
    isLoading = false;
    @ViewChild(PlaceholderDirective)
    hostAlert: PlaceholderDirective;
    closeAlertSub : Subscription;

    constructor(private authService: AuthService, 
                private router: Router, 
                private componentFactoryResolver : ComponentFactoryResolver,
                private loggingService: LoggingService){}

    ngOnInit(){
        this.loggingService.printLog("AuthComp: Inside ngOnInit");
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
            this.error = null;
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            this.error = error;
            this.isLoading = false;
            this.onErrorShowAlert(error);
        });

        this.authForm.reset();
    }

    onCloseAlert(){
        this.error = null;
    }

    onErrorShowAlert(message:string){
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const viewContainerRefHost = this.hostAlert.viewContainerRef;
        viewContainerRefHost.clear();
        const createdComponent = viewContainerRefHost.createComponent(alertComponentFactory);
        createdComponent.instance.message = message;
        this.closeAlertSub = createdComponent.instance.closeAlertEvent.subscribe(
            () => {
                this.closeAlertSub.unsubscribe();
                viewContainerRefHost.clear();
            }
        );
    }

    ngOnDestroy(){
        if(this.closeAlertSub != null){
            this.closeAlertSub.unsubscribe();
        }
    }
}
