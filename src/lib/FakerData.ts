import { Faker, faker } from '@faker-js/faker';


export class FakerData {
    public getFakerData(): Faker {
        return faker;
    }
    public setFullName(): string {
        return faker.name.fullName();
    }
    public setFirstName(): string {
        return faker.name.firstName();
    }
    public setLastName(): string {
        return faker.name.lastName();
    }
    public setEmail(): string {
        return faker.internet.email();
    }
    public setUsername(): string {
        return faker.internet.userName();
    }
    public setPassword(): string {
        return faker.internet.password();
    }
    public setNumberLimit(limit:number){
        return faker.random.numeric(limit);
    }
    public setTextLinesLimit(numberOfLine: number) {
        return faker.lorem.lines(numberOfLine);
    }
    public setSentences(numberOfSentances: number){
        return faker.lorem.sentences(numberOfSentances);
    }
    public set(numberOfChar: number){
        return faker.lorem.sentences(numberOfChar);
    }


}