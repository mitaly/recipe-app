import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list.actions';
import * as fromShoppingList from '../shopping-list.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm')
  ingredientForm:NgForm;
  index: number;
  editMode = false;
  storeSubs : Subscription;

  constructor(private shoppingListService:ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.storeSubs = this.store.select('shoppingList')
      .subscribe(data => {
        if(data.editedIngredientIndex > - 1){
          this.editMode = true;
          this.index = data.editedIngredientIndex;
          this.ingredientForm.setValue(data.editedIngredient);
        }else{
          this.editMode = false;
        }
      });
    // this.shoppingListService.startedEditing.subscribe(
    //   index => {
    //     this.ingredientForm.setValue(this.shoppingListService.getIngredientById(index));
    //     this.editMode = true;
    //     this.index = index;
    //   }
    // );
  }

  addIngredient(){
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
    if(this.editMode){
      console.log('update ingredient:'+ingredient.name+ingredient.amount);
      // this.shoppingListService.updateIngredient(ingredient, this.index);
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction(ingredient));
    }else{
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredient));
    }
    this.resetForm();
  }

  resetForm(){
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditingIngredient());
  }

  deleteIngredient(){
    // this.shoppingListService.deleteIngredient(this.index);
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    this.resetForm();
  }

  ngOnDestroy(){
    this.storeSubs.unsubscribe();
  }
}
