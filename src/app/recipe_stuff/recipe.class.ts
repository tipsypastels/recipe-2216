import { Ingredient } from './ingredient.class';

export class Recipe {
  constructor(
    public name: string, public ingredients: Ingredient[], public instructions: string[], public estimated_time: string
  ) {

  } 

  add_ingredient(other: Ingredient) : void {
    this.ingredients.push(other);
  }

  add_blank_ingredient() : void {
    this.ingredients.push(new Ingredient('', 1));
  }

  add_instruction(other: string) : void {
    this.instructions.push(other);
  }

  add_blank_instruction() : void {
    this.instructions.push('');
  }
}