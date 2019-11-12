import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
// import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  index:number;

  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param) => {
        this.index = +param['id'];
        this.recipe = this.recipeService.getRecipe(+param['id']);
      }
    );
  }

  addIngredients(){
    // this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.navToNoRecipeSelected();
  }

  navToNoRecipeSelected(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
