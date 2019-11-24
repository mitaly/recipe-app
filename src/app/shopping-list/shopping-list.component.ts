import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [];

  constructor(private shoppingListService:ShoppingListService, private loggingService:LoggingService) { }

  ngOnInit() {
    this.loggingService.printLog("ShoppingList:Inside ngOnInit");
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChangedEvent.subscribe(
      (ingredients:Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
  }

  onEdit(i:number){
    this.shoppingListService.startedEditing.next(i);
  } 
}
