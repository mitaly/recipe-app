import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipe:Recipe;
  index:number;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {
    this.initRecipeForm();
    this.route.params.subscribe(
      (param) => {
        if(param['id'] != null){
          this.editMode = true;
          this.index = +param['id'];
          this.recipe = this.recipeService.getRecipe(+param['id']);
          this.initRecipeForm();
        }
      }
    );
  }

  private initRecipeForm(){
    var name = '';
    var description = '';
    var imagePath = '';
    var ingredients = new FormArray([]);
    if(this.editMode){
      name = this.recipe.name;
      description = this.recipe.description;
      imagePath = this.recipe.imagePath;
      if(this.recipe['ingredients']){
        for(let ingredient of this.recipe.ingredients){
          ingredients.push(new FormGroup({
            'name':new FormControl(ingredient.name),
            'amount':new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients' : ingredients
    });
  }

  onAddNewIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null, Validators.required),
      'amount':new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.get('name').value,
    //   this.recipeForm.get('description').value,
    //   this.recipeForm.get('imagePath').value,
    //   this.recipeForm.get('ingredients').value
    // );
    if(this.editMode){
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.cancelEditing();
  }

  cancelEditing(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onDeleteIngredient(index: number){
    console.log((<FormArray>this.recipeForm.get('ingredients')).removeAt(index));
  }
}
