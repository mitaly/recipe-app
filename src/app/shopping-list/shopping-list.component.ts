import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromShoppingList from './shopping-list.reducer';
import * as ShoppingListActions from './shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService:ShoppingListService, 
              private loggingService:LoggingService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.loggingService.printLog("ShoppingList:Inside ngOnInit");
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.ingredientChangedEvent.subscribe(
    //   (ingredients:Ingredient[]) =>{
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEdit(i:number){
    this.store.dispatch(new ShoppingListActions.StartEditingIngredient(i));
    // this.shoppingListService.startedEditing.next(i);
  } 
}
