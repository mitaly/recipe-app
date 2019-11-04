import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientForm')
  ingredientForm:NgForm;
  index: number;
  editMode = false;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe(
      index => {
        this.ingredientForm.setValue(this.shoppingListService.getIngredientById(index));
        this.editMode = true;
        this.index = index;
      }
    );
  }

  addIngredient(){
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
    if(this.editMode){
      console.log('update ingredient:'+ingredient.name+ingredient.amount);
      this.shoppingListService.updateIngredient(ingredient, this.index);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.resetForm();
  }

  resetForm(){
    this.ingredientForm.reset();
    this.editMode = false;
  }

  deleteIngredient(){
    this.shoppingListService.deleteIngredient(this.index);
    this.resetForm();
  }
}
