import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const START_EDITING_INGREDIENT = "START_EDITING_INGREDIENT";
export const STOP_EDITING_INGREDIENT = "STOP_EDITING_INGREDIENT";

export class AddIngredientAction implements Action{
    readonly type = ADD_INGREDIENT;
    constructor(public payload:Ingredient){}
}

export class AddIngredientsAction implements Action{
    readonly type= ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]){}
}

export class DeleteIngredientAction implements Action{
    readonly type = DELETE_INGREDIENT
}

export class UpdateIngredientAction implements Action{
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient){}
}

export class StartEditingIngredient implements Action{
    readonly type = START_EDITING_INGREDIENT;
    constructor(public payload:number){}
}

export class StopEditingIngredient implements Action{
    readonly type = STOP_EDITING_INGREDIENT;
}
export type ShoppingListAction = AddIngredientAction | AddIngredientsAction | DeleteIngredientAction | UpdateIngredientAction 
    | StartEditingIngredient | StopEditingIngredient;
