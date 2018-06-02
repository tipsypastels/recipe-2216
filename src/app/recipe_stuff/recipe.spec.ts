import { Recipe } from './recipe.class';
import { Ingredient } from './ingredient.class';

describe('recipies', function() {
  var ingredients: Ingredient[];
  var instructions: string[];
  var recipe: Recipe;

  beforeEach(function() {
    ingredients = [new Ingredient('saffron', 1)];
    instructions = ['Eat.'];
    recipe = new Recipe(ingredients, instructions, '5 minutes');
  });
  
  it('should create a recipe with the stated ingredients and instructions', function() {
    expect(recipe.ingredients).toBe(ingredients);
    expect(recipe.instructions).toBe(instructions);
    expect(recipe.estimated_time).toBe('5 minutes');
  });

  it('should allow adding an ingredient', function() {
    let extra = new Ingredient('anise', 3);
    recipe.add_ingredient(extra);

    expect(recipe.ingredients).toEqual(jasmine.arrayContaining([extra]));
  });

  it('should allow adding an instruction', function() {
    let ins = 'Wait 100 years';
    recipe.add_instruction(ins);

    expect(recipe.instructions).toEqual(jasmine.arrayContaining([ins]));
  });
});