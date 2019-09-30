import  { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService{
  private recipes = [
    new Recipe("Pasta", "Red sauce pasta", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg"),
    new Recipe("Chicken", "Masala chicken", "https://img.delicious.com.au/bsUYtcs3/w759-h506-cfill/del/2019/02/zucchini-spaghetti-with-bolognese-101168-2.jpg")
  ];

  recipeSelectedEvent = new EventEmitter<Recipe>();

  getRecipes(){
    //returns a copy of recipes array so that this.recipes is always protected from changed from outside
    //this is needed becauce (returns this.recipes) will return reference of actual array
    return this.recipes.slice();
  }
}
