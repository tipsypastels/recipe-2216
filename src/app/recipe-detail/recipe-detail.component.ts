import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../recipe_stuff/ingredient.class';
import { Recipe } from '../recipe_stuff/recipe.class';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  triggerDeletion() : void {
    this.selectedRecipe = null;
    this.onDelete.emit(this.selectedRecipe);
  }

  editing: boolean = false;

  edit() : void { 
    this.editing = true;
  }

  doneEditing() : void {
    this.editing = false;
  }

}
