import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient("Apple", 2), new Ingredient("Orange", 5)];
  ingredientChangedEvent = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  updateIngredient(ingredient: Ingredient, index : number){
    console.log(index);
    this.ingredients[index] = ingredient;
    console.log(this.ingredients);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }

  getIngredientById(index: number){
    return this.ingredients[index];
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index, 1);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
}
