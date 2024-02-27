import test from "node:test";
/**
 * * There are three main primitives in JavaScript and TypeScript.
 * 
 * boolean - true or false values
 * number - whole numbers and floating point value
 * string - text values like "TypeScript Rocks"
 * 
 * * There are also 2 less common primitives used in later versions of Javascript and TypeScript.
 * 
 * bigint - whole numbers and floating point values, but allows larger negative and positive numbers than the number type
 * symbol are used to create a globally unique identifier.
 * 
 * * When creating a variable, there are two main ways TypeScript assigns a type: Explicit & Implicit
 * 
 *  let firstName: string = "Dylan"; //  Explicit type assignment are easier to read and more intentional.
 *  let firstName = "Dylan"; // Implicit - TypeScript will "guess" the type, based on the assigned value:
 * 
 * * any is a special type that disables type checking and effectively allows all types to be used.
 * * unknown is a similar, but safer alternative to any.
 * * never effectively throws an error whenever it is defined, also is rarely used, especially by itself
 * * undefined and null are types that refer to the JavaScript primitives undefined and null respectively.
 * 
 * * arrays & tuples
 * 
 * * Aliases & interfaces allows types to be easily shared between different variables/objects.
 * 
 * * Union Types are used when a value can be more than a single type.
 * 
 */


function add(n1: number, n2: number) {
    return n1 + n2;
}
test('Data types', async () => {
    /**
     * Type annotations || signature 
     * 
     */
    let theName: string = "elshafei";
    let theAge: number = 40;
    let hire: boolean = true;
    let all: any = "ismail elshafeiy";

    theName = "somea";
    all = 100;
    all = "test";
    all = true;
    console.log(theName);
    console.log(add(10, 10))

    /**
     * Type annotations with arrys
     */
    let myFriends: string[] = ["ismail", "Mohamed", "ahmed"];

    for (const element of myFriends) {
        console.log(element.repeat(3))
    }
    /**
     * Type annotations with multidiemesnional arrys
     */
    let arrayOne: number[] = [1, 2, 3, 4, 5];
    let arrayTwo: string[] = ["A", "B", "C"];
    let arrayThree: (string | number)[] = [1, 2, 3, 4, "A", "B", "C"];
    let arrayFour: (string | number | string[] | boolean)[] = [1, 2, 3, "A", "B", "c", ["F", "G"], true, false];
    /**
     * Type annotations with Functions
     * tsconfig options:
     * 
     * noImplicityAny
     * 
     * noImplicityReturns
     * --> will check all code paths in functions to ensure they return value
     * 
     * noUnusedLocals
     * --> Report Errors on unused Local variables
     * 
     * noUnusedParamters
     * --> Report Errors on unused paramters in functions
     */
    let showMsg = true;

    function showDetails(name: string, age: number, salary: number): string {
        let n = 10;
        if (showMsg) {
            return `Hello ${name} - Age Is ${age}, Salary Is ${salary}, test ${n} `;
        }
        return `No data to show`;
    }
    console.log(showDetails("ismail", 30, 5000))

    function showDetails2(name?: string, age?: number, salary?: number): string {
        if (showMsg) {
            return `${name} - ${age} - ${salary}`;
        }
        return `No data to show`;
    }
    console.log(showDetails("ismail", 12, 22))

    /**
     * Data types 
     * Type Alias
     */

    type st = string;
    let name2: st = "elshafeiy2";
    name2 = "ismail";

    type standum = string | number;
    let name3: standum = "iss";
    name3 = "Test String";
    name3 = 30;


    /**
     * Data types 
     * Advanced Type Alias
     */

    type Buttons = {
        up: string,
        down: string,
        right: string,
        left: string
    }
    type last = Buttons & {
        select: string,
        start: number,
        check: boolean
    }
    function getButtonsActions(btns: Buttons) {
        console.log(`Action for button up is ${btns.up}`);
        console.log(`Action for button down is ${btns.down}`);
        console.log(`Action for button right is ${btns.right}`);
        console.log(`Action for button left is ${btns.left}`);
    }
    getButtonsActions({ up: "jump", right: "Go right", down: "Go down", left: "Go Left" });

    function getLastActions(btns: last): void {
        console.log(`Action for button up is ${btns.up}`);
        console.log(`Action for button down is ${btns.down}`);
        console.log(`Action for button right is ${btns.right}`);
        console.log(`Action for button left is ${btns.left}`);
    }
    getLastActions({ up: "jump", right: "Go right", down: "Go down", left: "Go Left", select: "TestSelect", start: 30, check: true });


    /**
     * Data types 
     * literal Types
     */

    type nums = 0 | 1 | -1;
    function compare(num1: number, num2: number): nums {
        if (num1 === num2) {
            return 0;
        } else if (num1 > num2) {
            return 1;
        } else {
            return -1;
        }
    }
    console.log(compare(20, 20)); // 0
    console.log(compare(20, 15)); // 1
    console.log(compare(20, 30)); // -1

    /**
     * Data types 
     * tuple 
     *   Is another sort of array type
     *   We know exactly hom many elements It contains
     *   We know which type it contains at specific positions
     */

    let articale: [number, string, boolean] = [11, "Test String", true];
    console.log(articale)
    const [id, title, published] = articale;
    console.log(id);
    console.log(title);
    console.log(published);

    /**
     * Data Types
     * Enums --> Enumerations
     *    Allow us to set of named constants
     *    Used for logical Grouping collections of constans "Collections of realated values"
     *    It's organize ypur code
     *    By default Enums are number based, first element is 0
     *    There are heterogeneous Enums [string , numbers, boolean ]
     * 
     * Enums advanced
     *    Refer to another enum
     *    Refer to same enum
     *    Have calculations
     *    Have functions
     */

    function getHardSec(): number {
        return 3;
    }

    enum Kids {
        Five = 25,
        seven = 20,
        Ten = 15
    }
    enum Levels {
        KIDS = Kids.Ten,
        EASY = 10,
        MEDIUM = EASY - 3,
        HARD = getHardSec(),

    }

    let lev: string = "Easy";

    if (lev === "Easy") {
        console.log(`The level is [ ${lev} ] and number of sec is [ ${Levels.HARD} ]`)
    }

    /**
     * type annotations with Objects 
     */

    let myObject: {
        id: number,
        name: string,
        hire: boolean,
        skill: {
            one: string,
            two: string
        }
    } = {
        id: 100,
        name: "ismail",
        hire: true,
        skill: {
            one: "HTML",
            two: "CSS"
        }
    }
    myObject.id = 101;
    myObject.name = "Som3a";
    myObject.hire = false;
    console.log(`ID = ` + myObject.id);
    console.log(`Name = ` + myObject.name);
    console.log(`Hire = ` + myObject.hire);


    let w: unknown = 1;
    w = "string"; // no error

    w = {
        runANonExistentMethod: () => {
            console.log("I think therefore I am");
        }
    } as { runANonExistentMethod: () => void }

    // How can we avoid the error for the code commented out below when we don't know the type? 
    // w.runANonExistentMethod(); // Error: Object is of type 'unknown'. 

    if (typeof w === 'object' && w !== null) {
        (w as { runANonExistentMethod: Function }).runANonExistentMethod();
    }
    // Although we have to cast multiple times we can do a check in the if to secure our type and have a safer casting



    // define our tuple
    let ourTuple: [number, boolean, string];

    // initialize correctly
    ourTuple = [5, false, 'Coding God was here'];

    // We have no type safety in our tuple for indexes 3+
    ourTuple.push('Something new and wrong');
    ourTuple.push('Something new and wrong 2');
    ourTuple.push('Something new and wrong 3');



    console.log(ourTuple);

    // using aliases
    // Type Aliases allow defining types with a custom name (an Alias).

    type CarYear = number
    type CarType = string
    type CarModel = string
    type Car = {
        year: CarYear,
        type: CarType,
        model: CarModel
    }

    const carYear: CarYear = 2001
    const carType: CarType = "Toyota"
    const carModel: CarModel = "Corolla"
    const car: Car = {
        year: carYear,
        type: carType,
        model: carModel
    };


    // using interfaces
    // it's are similar to type aliases, except they only apply to object types
    // interfaces can extend each other's definition.

    interface Rectangle {
        height: number,
        width: number
    }

    interface ColoredRectangle extends Rectangle {
        color: string
    }

    const coloredRectangle: ColoredRectangle = {
        height: 20,
        width: 10,
        color: "red"
    };

    // usnig union types

    function printStatusCode(code: string | number) {
        console.log(`My status code is ${code}.`)
    }
    printStatusCode(404);
    printStatusCode('404');
});