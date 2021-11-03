import { User } from "./user.entity";
import { UserId } from "../value-objects/users/user-id.value";
import { Name } from "../value-objects/users/name.value";
import { Email } from "../value-objects/users/email.value";
import { Password } from "../value-objects/users/password.value";
import { Age } from "../value-objects/users/age.value";
import { ContractorRegisteredEvent } from "../events/contractor-registered.event";

export class Contractor extends User{
  public constructor(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number) {
    super(id, name, email, password, age, rate, numberOfRates);
  }

  public register() {
    const event = new ContractorRegisteredEvent(this.id.getValue(), this.name.getName(), this.email.getEmail(), this.password.getPassword(), this.age.getAge(), this.rate, this.numberOfRates);
    this.apply(event);
  }
}