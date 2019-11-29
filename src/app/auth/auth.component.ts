import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

    constructor(private componentFactoryResolver : ComponentFactoryResolver,
                private loggingService: LoggingService,
                private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.loggingService.printLog("AuthComp: Inside ngOnInit");
        this.store.select('auth').subscribe(
            data => {
                this.isLoading = data.loading;
                this.error = data.authError;

                if(this.error){
                    this.onErrorShowAlert(this.error);
                }
            }
        )
    }

    onModeSwitch(){
        this.isLogin = !this.isLogin;
    }

    onSubmit(){
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
    
        if(this.isLogin){
            this.store.dispatch(new AuthActions.LoginStartAction({email: email, password:password}));
        }else{
            this.store.dispatch(new AuthActions.SignUpStartAction({email: email, password: password}));
        }
        this.authForm.reset();
    }

    onCloseAlert(){
        this.store.dispatch(new AuthActions.ClearErrorAction());
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
