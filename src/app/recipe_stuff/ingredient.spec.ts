import { Ingredient } from './ingredient.class';

describe('ingredients', function() {
  it('should create an ingredient with the stated name and quantity', function() {
    let ingredient = new Ingredient('spices', 5);
    expect(ingredient.name).toBe('spices');
    expect(ingredient.quantity).toBe(5);
  });

  it('should allow adding ingredients of the same type', function() {
    let ingredient = new Ingredient('pineapple', 3);
    let other_ingredient = new Ingredient('pineapple', 5);

    ingredient.add(other_ingredient);
    expect(ingredient.quantity).toBe(8);
    expect(other_ingredient.quantity).toBe(0);
  });

  it('should throw an error if added ingredients have different types', function() {
    let ingredient = new Ingredient('pineapple', 3);
    let other_ingredient = new Ingredient('spices', 8);

    expect(function() {
      ingredient.add(other_ingredient)
    }).toThrow();
  });
});