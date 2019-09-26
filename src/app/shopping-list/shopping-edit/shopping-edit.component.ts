import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameOfIngredient') ingredientNameElement:ElementRef;
  @ViewChild('amountOfIngredient') ingredientAmountElement:ElementRef;
  @Output() addIngredientEvent = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addIngredient(){
    const ingredient = new Ingredient(
              this.ingredientNameElement.nativeElement.value,
              this.ingredientAmountElement.nativeElement.value);
    if(ingredient.name, ingredient.amount){
      this.addIngredientEvent.emit(ingredient);
    }
  }

}
