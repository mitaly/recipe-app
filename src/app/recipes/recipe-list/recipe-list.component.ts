import { Component, OnInit } from '@angular/core';
import  { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [];

  constructor() { }

  ngOnInit() {
    this.recipes.push(new Recipe("Pasta", "Red sauce pasta", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg"));
    this.recipes.push(new Recipe("Chicken", "Masala chicken", "https://img.delicious.com.au/bsUYtcs3/w759-h506-cfill/del/2019/02/zucchini-spaghetti-with-bolognese-101168-2.jpg"));
  }

}
