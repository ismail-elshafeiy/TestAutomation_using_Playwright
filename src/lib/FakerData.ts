import { faker , Faker} from '@faker-js/faker';

export class FakerData {
  public getFakerData(): Faker {
    return faker;
  }
  public setFullName(): string {
    return faker.person.fullName();
  }
  public setFirstName(): string {
    return faker.person.firstName();
  }
  public setLastName(): string {
    return faker.person.lastName();
  }
  public setEmail(): string {
    return faker.internet.email();
  }
  public setUsername(): string {
    return faker.internet.username();
  }
  public setPassword(): string {
    return faker.internet.password();
  }
  public setNumberLimit(limit: number) {
    return faker.number.int({ min: 0, max: Math.pow(10, limit) - 1 }).toString();
  }
  public setTextLinesLimit(numberOfLine: number) {
    return faker.lorem.lines(numberOfLine);
  }
  public setSentences(numberOfSentances: number) {
    return faker.lorem.sentences(numberOfSentances);
  }
  public set(numberOfChar: number) {
    return faker.lorem.sentences(numberOfChar);
  }
}
