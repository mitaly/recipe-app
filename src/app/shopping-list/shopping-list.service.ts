import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient("Apple", 2), new Ingredient("Orange", 5)];
  ingredientChangedEvent = new EventEmitter<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }
}
