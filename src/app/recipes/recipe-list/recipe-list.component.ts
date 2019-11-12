import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  allRecipes : Recipe[];
  recipesChangedSubscription : Subscription;

  constructor(private recipeService:RecipeService) {
  }

  ngOnInit() {
    this.allRecipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(latestRecipes => {
      this.allRecipes = latestRecipes;
    });
  }

  ngOnDestroy(){
    this.recipesChangedSubscription.unsubscribe();
  }
}
