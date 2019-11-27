import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients: Ingredient[],
    editedIngredientIndex: number;
    editedIngredient: Ingredient
}

const initialState : State= {
    ingredients:  [
        new Ingredient("Apple", 2),
        new Ingredient("Orange", 5)
    ],
    editedIngredientIndex: -1,
    editedIngredient: null
}

export function shoppingListReducer(state = initialState, action:ShoppingListActions.ShoppingListAction){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            var newIngredient = action.payload;
            return {
                ...state,
                ingredients : [
                    ...state.ingredients,
                    newIngredient
                ]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : [
                    ...state.ingredients,
                    ...action.payload
                ]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const editedIngredient = {
                ...state.editedIngredient,
                ...action.payload
            }
            var updatedIngredients = [
                ...state.ingredients
            ];
            updatedIngredients[state.editedIngredientIndex] = editedIngredient;
            return {
                ...state,
                ingredients : updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingr, index) => {
                    return index != state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDITING_INGREDIENT:
            return {
                ...state,
                editedIngredient : {
                    ...state.ingredients[action.payload]
                },
                editedIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDITING_INGREDIENT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default: return state;
    }
}