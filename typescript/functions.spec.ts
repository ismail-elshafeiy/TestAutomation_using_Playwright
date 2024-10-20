import test from "node:test";
test("Functions", () => {
  /**
   * Functions
   *  Optionl and default paramters
   *
   *  IN JavaScript, every paramters is Optional --> "undefined" if didn't use it
   *  "?" Optional Paramters
   */

  function showData(name: string = "Test", age: number, country: string) {
    return `${name} - ${age} - ${country}`;
  }
  console.log(showData(undefined, 30, "Egypt"));

  function showData2(name: string, age: number, country?: string) {
    return `${name} - ${age} - ${country}`;
  }
  console.log(showData2("ismail", 30));

  /**
   * Functions
   *  Rest paramters
   *  What about float -> All is under type number
   */

  function addAll(...nums: number[]) {
    let result = 0;
    // for (let i = 0; i < nums.length; i++) {
    //     result += nums[i];
    // }
    nums.forEach((num) => (result += num));
    return result;
  }
  console.log(addAll(10, 20, 30, 40, 10.5, +true));

  /**
   * Anonymous Function
   * Arrow Functions
   */

  const addWithAnonymous = function (num1: number, num2: number): number {
    return num1 + num2;
  };
  console.log(`This is anonymous function = ` + addWithAnonymous(10, 20));

  const addWithArrow = (num1: number, num2: number): number => num1 + num2;
  console.log(`This is arrow fuction =` + addWithArrow(10, 20));

  /**
   *  Return type
   * The type of the value returned by the function can be explicitly defined.
   * the `: number` here specifies that this function returns a number
   *
   * If no return type is defined, TypeScript will attempt to infer it through the types of the variables or expressions returned.
   *
   */
  function getTime(): number {
    return new Date().getTime();
  }
  console.log(getTime());

  /**
   * Void Return type
   * The type void can be used to indicate a function doesn't return any value.
   *
   */
  function printHello(): void {
    console.log("Hello!");
  }

  /**
   * Patamerters
   * Functions param are typed with similar syntax as variable declaratios
   * If no parameter type is defined, TypeScript will default to using any,
   * unless additional type information is available as shown in the Default Parameters and Type Alias sections below.
   */

  function addWithParams(num1: number, num2: number) {
    return num1 * num2;
  }
  console.log(addWithParams(10, 20));

  /**
   * Optional Parameters
   * By default TypeScript will assume all parameters are required, but they can be explicitly marked as optional.
   * the `?` operator here marks parameter `c` as optional
   */

  function addWithOptionlParams(a: number, b: number, c?: number) {
    return a + b + (c || 0);
  }
  console.log(addWithOptionlParams(2, 3, 4));
  console.log(addWithOptionlParams(2, 3));
  /**
   * Default Parameters
   * For parameters with default values, the default value goes after the type annotation:
   *
   */
  function pow(value: number, exponent: number = 10) {
    return value ** exponent;
  }
  console.log(pow(2, 3));

  /**
   * Named Parameters
   * Typing named parameters follows the same pattern as typing normal parameters.
   */
  function divide({ dividend, divisor }: { dividend: number; divisor: number }) {
    return dividend / divisor;
  }

  console.log(divide({ dividend: 10, divisor: 2 }));

  /**
   * Rest Parameters
   * Rest parameters can be typed like normal parameters, but the type must be an array as rest parameters are always arrays.
   */
  function add(a: number, b: number, ...rest: number[]) {
    return a + b + rest.reduce((p, c) => p + c, 0);
  }

  console.log(add(10, 10, 10, 10, 10));

  /**
   * Type Alias
   * Function types can be specified separately from functions with type aliases.
   */
  type Negate = (value: number) => number;

  // in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`
  const negateFunction: Negate = (value) => value * -1;

  console.log(negateFunction(10));
});
