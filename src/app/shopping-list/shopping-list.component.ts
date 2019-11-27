import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as ShoppingListActions from './shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Observable<{ingredients: Ingredient[]}>;

  constructor(private loggingService:LoggingService,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.loggingService.printLog("ShoppingList:Inside ngOnInit");
    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(i:number){
    this.store.dispatch(new ShoppingListActions.StartEditingIngredient(i));
  } 
}
