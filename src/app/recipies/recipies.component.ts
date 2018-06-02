import { Component, OnInit } from '@angular/core';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

import { Ingredient } from '../recipe_stuff/ingredient.class';
import { Recipe } from '../recipe_stuff/recipe.class';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})

export class RecipiesComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('stirred butter', [new Ingredient('butter', 11)], ['stir'], '5 minutes'),
    new Recipe('toast', [new Ingredient('bread', 2), new Ingredient('butter', 1)], ['toast'], '4 minutes')
  ];

  selectedRecipe: Recipe;

  onSelect(recipe: Recipe) : void {
    this.selectedRecipe = recipe;
  }

  onAdd() : void {
    let recipe = new Recipe(
      "Recipe Name", 
      [new Ingredient('', 1)], 
      ["Instructions"], 
      "Estimated Time"
    );

    this.recipes.push(recipe);
    this.selectedRecipe = recipe;
  }

  onDelete(element) : void {
    this.recipes.splice(this.recipes.indexOf(element), 1);
  }

  constructor() { }

  ngOnInit() {
  }

}
