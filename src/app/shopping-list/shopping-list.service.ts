import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient("Apple", 2), new Ingredient("Orange", 5)];
  ingredientChangedEvent = new Subject<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
}
