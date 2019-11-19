import { Component, OnInit } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector:"app-header",
  templateUrl:"./header.component.html", 
  styleUrls:["./header.component.css"]
})
export class HeaderComponent implements OnInit{
  constructor(private authService:AuthService,private dataStorageService:DataStorageService){}
  isLoggedIn = false;

  ngOnInit(){
    this.authService.user.subscribe(user => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

