import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{
    url = 'https://ng-recipe-book-4d629.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.put(this.url, this.recipeService.getRecipes(), {
                    params : new HttpParams().set('auth', user.token)
                });
        }))
        .subscribe(responseData => {
            console.log("Saved successfully! "+responseData);
        });
    }

    fetchRecipes(){
        console.log('jso');
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>(this.url, 
                    {
                        params: new HttpParams().append('auth', user.token)
                    });
            }),
            map( recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }), 
            tap(
                recipes =>{
                    this.recipeService.setRecipes(recipes);
                }
            )
        );
    }
}