import test from "node:test";

/**
 * interface
 *   Interface Declaration
 *     Serve Like Types
 *     Shape of Objects
 *     Define the syntax to follow
 *
 *   Use with object
 *   Use with functions
 *   Use Read only and Optionl Operator
 *
 *  Interface with Method and Paramters
 */
test.describe("Interface", () => {
  interface User {
    id?: number;
    name: string;
    hire: boolean;
    sayHello(): string;
    sayWelcome: () => string;
    getDouble(num: number): number;
  }
  let user: User = {
    id: 100,
    name: "ismail",
    hire: true,
    sayHello() {
      return `Hello ${this.name}`;
    },
    sayWelcome: () => {
      return `Welcome ${user.name}`;
    },
    getDouble(n) {
      return n * 2;
    },
  };
  console.log(user.id);
  console.log(user.name);
  console.log(user.hire);
  console.log(user.sayHello());
  console.log(user.sayWelcome());
  console.log(user.getDouble(2));

  function getData(data: User) {
    console.log(`ID -> ${data.id}`);
    console.log(`User name -> ${data.name}`);
    console.log(`Hire -> ${data.hire}`);
    console.log(`Say Hello -> ${data.sayHello()}`);
    console.log(`Say Welcome -> ${data.sayWelcome()}`);
  }
  /**
   * Interface and Reopen
   */
  interface Settings {
    readonly themes: boolean;
    font: string;
  }
  interface Settings {
    sidbar?: boolean;
  }

  interface Settings {
    external?: boolean;
  }
  let userSettings: Settings = {
    themes: true,
    font: "Arial",
    sidbar: false,
    external: true,
  };
  /**
   * Interface and Extending
   */

  interface Moderator {
    role?: string | number;
  }

  interface Admin extends Moderator, User {
    protect?: boolean;
  }

  let user2: Admin = {
    id: 101,
    name: "ismail Moderator",
    hire: true,
    role: "Admin",
    sayHello() {
      return `Hello ${this.name}`;
    },
    sayWelcome: () => {
      return `Welcome ${user.name}`;
    },
    getDouble(n) {
      return n * 2;
    },
    protect: true,
  };
});
