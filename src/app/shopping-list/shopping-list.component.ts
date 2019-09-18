import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [];
  constructor() { }

  ngOnInit() {
    this.ingredients.push(new Ingredient("Apple", 2));
    this.ingredients.push(new Ingredient("Orange", 5));
  }

}
