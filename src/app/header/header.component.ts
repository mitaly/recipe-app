import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector:"app-header",
  templateUrl:"./header.component.html", 
  styleUrls:["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private authService:AuthService,
              private dataStorageService:DataStorageService,
              private store: Store<fromApp.AppState>){}
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
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }
}

