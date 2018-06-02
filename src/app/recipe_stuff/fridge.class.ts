import { Recipe } from './recipe.class';
import { Ingredient } from './ingredient.class';

export class Fridge {
  contents: Ingredient[] = [];

  add(other: Ingredient) : void {
    let index = this.find_index(other);

    if (index > -1) {
      this.contents[index].quantity += other.quantity;
    } else {
      this.contents.push(other);
    }
  }

  remove(other: Ingredient) : void {
    let index = this.find_index(other);

    if (index > -1) {
      this.contents[index].quantity -= other.quantity;

      if (this.contents[index].quantity < 1) {
        this.contents.splice(index, 1);
      }
    } else {
      throw 'The fridge does not contain that item.';
    }
  }

  /* helper function to simplify the tests */
  contains(name: string) : boolean {
    return this.contents.map(elem => elem.name).includes(name);
  }

  amount_of(other: Ingredient) : number {
    let index = this.find_index(other);

    if (index === -1) {
      return 0;
    }

    return this.contents[index].quantity;
  }

  /* helper function to find indexes */
  find_index(other: Ingredient) : number {
    return this.contents.findIndex(elem => {
      return elem.name === other.name;
    });
  }

  amount_difference(other: Ingredient) : any {
    let index = this.find_index(other);

    if (index === -1) {
      return;
    }

    return other.quantity - this.contents[index].quantity;
  }

  check_recipe(other: Recipe) : object {
    let shopping_list: Ingredient[] = [];
    let already_in: Ingredient[] = [];

    other.ingredients.forEach(ingredient => {
      if (this.contains(ingredient.name)) {
        let amount_difference = this.amount_difference(ingredient);
        let index = this.find_index(ingredient);

        if (typeof amount_difference === 'undefined') {
          shopping_list.push(ingredient);
        } else {
          if (amount_difference < 1) {
            already_in.push(new Ingredient(
              ingredient.name, this.amount_of(ingredient) - -amount_difference
            ));
          } else {
            shopping_list.push(new Ingredient(
              ingredient.name, amount_difference
            ));

            already_in.push(new Ingredient(
              ingredient.name, this.amount_of(ingredient)
            ));
          }
        }
      } else {
        shopping_list.push(ingredient);
      }
    });

    return {
      shopping_list,
      already_in
    };
  }
}