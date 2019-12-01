import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  editMode = false;
  recipe:Recipe;
  index:number;
  recipeForm:FormGroup;
  recipeSubs:Subscription;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        if(params['id'] != null){
          this.editMode = true;
          this.index = +params['id'];
        }
        this.initRecipeForm();
      }
    );
  }

  private initRecipeForm(){
    var name = '';
    var description = '';
    var imagePath = '';
    var ingredients = new FormArray([]);

    if(this.editMode){
      //need to store and unsubsribe the below subscription
      this.recipeSubs = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) =>{
            return index == this.index;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
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
      });
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
    console.log(this.recipeForm.value.ingredients);
    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipeAction({index: this.index, editedRecipe: this.recipeForm.value}));
    }else{
      this.store.dispatch(new RecipeActions.AddRecipeAction(this.recipeForm.value));
    }
    this.cancelEditing();
  }

  cancelEditing(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onDeleteIngredient(index: number){
    console.log((<FormArray>this.recipeForm.get('ingredients')).removeAt(index));
  }

  get controls(){
     return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(){
    if(this.recipeSubs){
      this.recipeSubs.unsubscribe();
      this.recipeSubs = null;
    }
  }
}
