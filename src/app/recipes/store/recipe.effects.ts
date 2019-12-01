import { Actions, ofType, Effect } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{
    url = 'https://ng-recipe-book-4d629.firebaseio.com/recipes.json';
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(this.url);
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        map((recipes) => {
            return new RecipeActions.SetRecipesAction(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        //below operator will merge the results of above subs(action) and subs in parameter(select)
        withLatestFrom(this.store.select('recipes')),
        switchMap(([recipesStoreAction, recipesState]) => {
            return this.http.put<Recipe[]>(this.url, recipesState.recipes);
        })
    );

    constructor(private actions$ : Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>){}
}