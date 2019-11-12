import  { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class RecipeService{
  // private recipes = [
  //   new Recipe("Pasta",
  //             "Red sauce pasta",
  //             "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg",
  //             [new Ingredient('Olives', 10), new Ingredient('Papaya', 2)]),
  //   new Recipe("Chicken",
  //             "Masala chicken",
  //             "https://img.delicious.com.au/bsUYtcs3/w759-h506-cfill/del/2019/02/zucchini-spaghetti-with-bolognese-101168-2.jpg",
  //             [new Ingredient('Chillies',4), new Ingredient('capsicum',6)])
  // ];
  private recipes : Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService:ShoppingListService){ }

  getRecipes(){
    //returns a copy of recipes array so that this.recipes is always protected from changed from outside
    //this is needed becauce (returns this.recipes) will return reference of actual array
    return this.recipes.slice();
  }

  addIngredients(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index:number):Recipe{
    return this.recipes[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(i:number, recipe:Recipe){
    this.recipes[i] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
