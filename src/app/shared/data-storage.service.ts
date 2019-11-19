import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{
    url = 'https://ng-recipe-book-4d629.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService:RecipeService){}

    storeRecipes(){
        return this.http.put(this.url, this.recipeService.getRecipes())
            .subscribe(responseData => {
                console.log("Saved successfully! "+responseData);
            });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(this.url)
            .pipe(map( recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }), 
            tap(
                recipes =>{
                    this.recipeService.setRecipes(recipes);
                }
            ));  
    }
}