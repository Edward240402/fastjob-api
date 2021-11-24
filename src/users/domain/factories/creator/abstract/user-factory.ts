import { User } from "../../../entities/user.entity";
import { UserId } from "../../../value-objects/user-id.value";
import { Name } from "../../../value-objects/name.value";
import { Email } from "../../../value-objects/email.value";
import { Password } from "../../../value-objects/password.value";
import { Age } from "../../../value-objects/age.value";

export abstract class UserFactory {
  protected constructor() {
  }

  //public abstract createUser(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number): User;
  public abstract createUser(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number,
                             yearsOfExperience: number, availability: string): User;
}