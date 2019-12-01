import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  allRecipes : Recipe[];
  recipesChangedSubscription : Subscription;
  recipesSub : Subscription;

  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    this.recipesSub = this.store.select('recipes').subscribe(data => {
        this.allRecipes = data.recipes;
    });
  }

  ngOnDestroy(){
    if(this.recipesSub){
      this.recipesSub.unsubscribe();
      this.recipesSub = null;
    }
  }
}
