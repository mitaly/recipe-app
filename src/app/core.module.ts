import { NgModule } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-intercepter.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers:[
        RecipeService, DataStorageService, AuthInterceptorService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
        } 
    ]
})
export class CoreModule{
    
}