import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list.actions';
import * as fromAppReducer from '../../store/app.reducer';
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

  constructor(private store: Store<fromAppReducer.AppState>) { }

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
  }

  addIngredient(){
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
    if(this.editMode){
      console.log('update ingredient:'+ingredient.name+ingredient.amount);
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction(ingredient));
    }else{
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
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    this.resetForm();
  }

  ngOnDestroy(){
    this.storeSubs.unsubscribe();
  }
}
