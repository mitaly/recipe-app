import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes:Routes = [
    {path:'', redirectTo:'/recipes', pathMatch:'full'},
    {path: 'recipes', component:RecipesComponent, canActivate: [AuthGuardService], children:[
        {path:'', component:NoRecipeSelectedComponent, pathMatch:'full'},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
    {path: 'shopping-list', component:ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
   
}