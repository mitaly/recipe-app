import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        NoRecipeSelectedComponent,
        RecipeEditComponent
    ],
    imports: [
        RecipesRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ]
})
export class RecipesModule{

}