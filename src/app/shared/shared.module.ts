import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective,
        LoaderComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        LoaderComponent,
        AlertComponent,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule{

}