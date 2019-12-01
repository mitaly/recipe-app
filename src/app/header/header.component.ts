import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map, take } from 'rxjs/operators';

@Component({
  selector:"app-header",
  templateUrl:"./header.component.html", 
  styleUrls:["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private store: Store<fromApp.AppState>){}
  isLoggedIn = false;
  authSubs : Subscription;

  ngOnInit(){
    // this.authService.user.subscribe(user => {
    //   this.isLoggedIn = user ? true : false;
    // });
    this.authSubs = this.store.select('auth').subscribe(data => {
      console.log("data received from login");
      console.log(data);
      this.isLoggedIn = data.user ? true : false;
    })
  }

  onSaveData(){
      this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.LogoutAction());
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }
}

