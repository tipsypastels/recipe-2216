import { Fridge } from './fridge.class';
import { Recipe } from './recipe.class';
import { Ingredient } from './ingredient.class';

describe('fridges', function() {
  var fridge;

  beforeEach(function() {
    fridge = new Fridge();
    fridge.contents = [
      new Ingredient('anise', 5),
      new Ingredient('pickles', 2),
      new Ingredient('chocolate milk', 1)
    ];
  });

  it('should allow adding an already present ingredient', function() {
    let other = new Ingredient('anise', 3);
    fridge.add(other);

    expect(fridge.contents).toEqual(
      jasmine.arrayContaining([new Ingredient('anise', 8)])
    );
  });

  it('should allow adding a new ingredient', function() {
    let other = new Ingredient('sugar', 5);
    fridge.add(other);

    expect(fridge.contains('sugar')).toBe(true);
    expect(fridge.contents).toEqual(
      jasmine.arrayContaining([other])
    );
  });

  it('should allow lowering the amount of an ingredient', function() {
    let other = new Ingredient('anise', 1);
    fridge.remove(other);

    expect(fridge.contains('anise')).toBe(true);
    expect(fridge.contents).toEqual(
      jasmine.arrayContaining([new Ingredient('anise', 4)])
    );
  });

  it('should allow totally removing an ingredient', function() {
    let other = new Ingredient('anise', 5);
    fridge.remove(other);

    expect(fridge.contains('anise')).toBe(false);
  });

  it('should not allow removing an item that is not contained', function() {
    let other = new Ingredient('baking powder', 1);

    expect(function() {
      fridge.remove(other);
    }).toThrow();
  });

  it('should be able to generate lists for items already in', function() {
    let recipe = new Recipe(
      [new Ingredient('anise', 2), new Ingredient('pickles', 1)], 
      ['nothing'], 'instant'
    );

    let lists = fridge.check_recipe(recipe);
    expect(lists.shopping_list).toEqual([]);
    expect(lists.already_in).toEqual(recipe.ingredients)
  });

  it('should be able to generate lists for items not in', function() {
    let recipe = new Recipe(
      [new Ingredient('apple slices', 17)],
      ['nothing'], 'instant'
    );

    let lists = fridge.check_recipe(recipe);
    expect(lists.shopping_list).toEqual(recipe.ingredients);
    expect(lists.already_in).toEqual([]);
  });

  it('should be able to generate lists for items insufficiently in', function() {
    let recipe = new Recipe(
      [new Ingredient('anise', 7)],
      ['nothing'], 'instant'
    );

    let lists = fridge.check_recipe(recipe);
    expect(lists.shopping_list).toEqual([new Ingredient('anise', 2)]);
    expect(lists.already_in).toEqual([new Ingredient('anise', 5)]);
  });

  it('should be able to generate fully mixed lists', function() {
    let recipe = new Recipe(
      [
        new Ingredient('anise', 17),
        new Ingredient('apple slices', 6),
        new Ingredient('dock leaf', 1),
        new Ingredient('chocolate milk', 1),
        new Ingredient('pickles', 1)
      ], ['nothing'], 'instant'
    );

    let lists = fridge.check_recipe(recipe);
    expect(lists.shopping_list).toEqual([
        new Ingredient('anise', 12),
        new Ingredient('apple slices', 6),
        new Ingredient('dock leaf', 1)
    ]);

    expect(lists.already_in).toEqual([
      new Ingredient('anise', 5),
      new Ingredient('chocolate milk', 1),
      new Ingredient('pickles', 1)
    ]);
  })
});