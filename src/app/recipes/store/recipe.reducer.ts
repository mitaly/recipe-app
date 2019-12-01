import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State{
    recipes: Recipe[]
}

const recipeState : State = {
    recipes : []
}
export function recipeReducer(state = recipeState, action:RecipeActions.RecipeAction){
    switch(action.type){
        case RecipeActions.UPDATE_RECIPE:
            var updatedRecipes = [
                ...state.recipes
            ];
            updatedRecipes[action.payload.index] = action.payload.editedRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [
                    ...state.recipes,
                    action.payload
                ]
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return action.payload !== index;
                })
            }
        
        case RecipeActions.SET_RECIPES:
            return{
                ...state,
                recipes: [
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}