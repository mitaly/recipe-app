import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipe:Recipe;
  
  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param) => {
        if(param['id'] != null){
          this.editMode = true;
          this.recipe = this.recipeService.getRecipe(+param['id']);
        }
      }
    );
  }

}
