import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from 'src/app/shopping-list/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as RecipeAction from '../store/recipe.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  index:number;

  constructor(private route:ActivatedRoute, 
              private router:Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.index = id;
        //As the below subscription is under the route.params subs, Angular itself manages to unsubscribe when not needed.
        //therefore no need to explicitly store and unsubscribe below one.
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index == this.index;
        })
      })
    )
    .subscribe(recipe => {
      this.recipe = recipe;
    })
    // this.route.params.subscribe(
    //   (param) => {
    //     this.index = +param['id'];
    //     this.recipeSubs = this.store.select('recipes').subscribe(data => {
    //       this.recipe = data.recipes[this.index];
    //     })
    //   }
    // );
  }

  addIngredients(){
    this.store.dispatch(new ShoppingListActions.AddIngredientsAction(this.recipe.ingredients));
  }

  deleteRecipe(){
    this.store.dispatch(new RecipeAction.DeleteRecipeAction(this.index));
    this.router.navigate(['/recipes']);
  }

  navToNoRecipeSelected(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

}
