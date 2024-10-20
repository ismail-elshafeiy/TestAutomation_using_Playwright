import test from "node:test";
test("Generic", () => {
  /**
   * Generic classes
   * Generic functions
   * Generic Methods
   * Generic Interfaces
   */
  function returnGeneric<T>(val: T): T {
    return val;
  }
  console.log(returnGeneric<number>(100));
  console.log(returnGeneric<string>("Test"));
  console.log(returnGeneric<boolean>(true));
  console.log(returnGeneric<number[]>([1, 2, 3, 4, 5]));
  /**
   * Arrow functions syntax
   * Multiple Types
   *
   */

  class NamedValue<T> {
    private _value: T | undefined;

    constructor(private name: string) {}

    public setValue(value: T) {
      this._value = value;
    }

    public getValue(): T | undefined {
      return this._value;
    }

    public toString(): string {
      return `${this.name}: ${this._value}`;
    }
  }

  const value = new NamedValue<number>("myNumber");

  value.setValue(10);

  console.log(value.toString()); // myNumber: 10
});
