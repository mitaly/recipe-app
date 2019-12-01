import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => {
               return recipeState.recipes;
            }),
            switchMap((recipes) => {
                if(recipes.length == 0){
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    // will wait for above call to get finised and return the SetRecipesAction.
                    return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES),
                        //won't subscribe to it throughtout. Just need one SetRecipes Action to get triggered.
                        take(1)
                    );
                }else{
                    return of(recipes);
                }
            })
        )
    }
}