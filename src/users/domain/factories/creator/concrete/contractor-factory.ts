import { UserInterface } from "../../product/user-interface";
import { UserId } from "../../../value-objects/user-id.value";
import { Name } from "../../../value-objects/name.value";
import { Email } from "../../../value-objects/email.value";
import { Password } from "../../../value-objects/password.value";
import { Age } from "../../../value-objects/age.value";
import { Contractor } from "../../../entities/contractor.entity";
import { UserFactory } from "../abstract/user-factory";
import { User } from "../../../entities/user.entity";

export class ContractorFactory extends UserFactory{
  constructor() {
    super();
  }

  public createUser(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number): User {
    return new Contractor(id, name, email, password, age, rate, numberOfRates);
  }
}