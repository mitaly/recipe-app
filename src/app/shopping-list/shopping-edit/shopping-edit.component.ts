import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameOfIngredient') ingredientNameElement:ElementRef;
  @ViewChild('amountOfIngredient') ingredientAmountElement:ElementRef;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient(){
    const ingredient = new Ingredient(
              this.ingredientNameElement.nativeElement.value,
              this.ingredientAmountElement.nativeElement.value);
    if(ingredient.name, ingredient.amount){
      this.shoppingListService.addIngredient(ingredient);
    }
  }

}
