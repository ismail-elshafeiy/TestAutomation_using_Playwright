import { Faker, faker } from '@faker-js/faker';

export class FakerData {
  public getFakerData(): Faker {
    return faker;
  }
  public setFullName(): string {
    return faker.person.fullName();
  }
  public setName(): string {
    return faker.person.firstName();
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
    return faker.string.numeric(limit);
  }
  public setWordLimit(limit: number) {
    return faker.lorem.words(limit);
  }
  public setAddress() {
    return faker.location.streetAddress();
  }
  public setTextLinesLimit(numberOfLine: number) {
    return faker.lorem.lines(numberOfLine);
  }
  public setParagraphsLimit(limit: number) {
    const randomText = faker.lorem.paragraphs();
    // Check if the generated text exceeds the specified length
    if (randomText.length > limit) {
      // Trim the text to the specified length
      return randomText.substring(0, limit);
    }
    return randomText;
  }
  public setAvatar() {
    return faker.image.avatar();
  }
  public setSentences(numberOfSentences: number) {
    return faker.lorem.sentences(numberOfSentences);
  }
}
