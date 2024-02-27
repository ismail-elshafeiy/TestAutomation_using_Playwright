import test from "node:test";
/**
 * Type annotations with class
 * 
 */
test('Classes', () => {
    class User {
        userName: string
        salary: number
        msg: () => string
        constructor(userName: string, salary: number) {
            this.userName = userName;
            this.salary = salary;
            this.msg = function () {
                return `Hello ${this.userName} Your salary is ${this.salary}`;
            }
        }
        sayMsg() {
            return `Hello ${this.userName} Your Salary is ${this.salary}`
        }
        get username(): string {
            return this.userName
        }
        set username(value: string) {
            this.userName = value;
        }
    }
    let userOne = new User("Elshafeiy", 10000)

    console.log(userOne.userName);
    console.log(userOne.salary);
    userOne.userName = "Som3a";
    console.log(userOne.userName)
    console.log(userOne.salary)
    console.log(userOne.msg());
    console.log(userOne.sayMsg());

    /**
     * Class
     *  Static Memebers
     * 
     */
    class Patient {
        static created: number = 0;
        static getCount(): void {
            console.log(`${this.created} Object Created`)
        }
        constructor(public username: string) {
            Patient.created++;
        }
    }
    let p1 = new Patient("P 1");
    let p2 = new Patient("P 2");
    let p3 = new Patient("P 3");
    console.log(Patient.created)
    Patient.getCount();
});