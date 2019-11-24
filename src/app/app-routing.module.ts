import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'', redirectTo:'/recipes', pathMatch:'full'},
            {path:'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'},
            {path:'shopping-list', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
            {path:'auth', loadChildren:'./auth/auth.module#AuthModule'}
            // {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => RecipesModule)},
            // {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => ShoppingListModule)},
            // {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => AuthModule)}

        ],
        {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}   