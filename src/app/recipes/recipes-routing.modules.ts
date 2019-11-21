import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const routes : Route[] = [
    {path: 'recipes', component:RecipesComponent, canActivate: [AuthGuardService], children:[
        {path:'', component:NoRecipeSelectedComponent, pathMatch:'full'},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]}
    ]}
]
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RecipesRoutingModule{

}