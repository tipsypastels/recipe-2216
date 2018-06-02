export class Ingredient {
  constructor(public name: string, public quantity: number = 0) {

  }

  add(other: Ingredient) : void {
    if (other.name === this.name) {
      this.quantity += other.quantity;
      other.quantity = 0;
    } else {
      throw 'Ingredients must be of the same type.';
    }
  }
}