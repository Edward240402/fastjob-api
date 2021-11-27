import { UserFactory } from "../abstract/user-factory";
import { UserId } from "../../../value-objects/user-id.value";
import { Name } from "../../../value-objects/name.value";
import { Email } from "../../../value-objects/email.value";
import { Password } from "../../../value-objects/password.value";
import { Age } from "../../../value-objects/age.value";
import { User } from "../../../entities/user.entity";
import { Employee } from "../../../entities/employee.entity";
import { TypeOfAccount } from '../../../value-objects/type-of-account.value';


export class EmployeeFactory extends UserFactory{
  constructor() {
    super();
  }

  public createUser(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number,
                    yearsOfExperience: number, availability: string,typeOfAccount:TypeOfAccount): User{
    return new Employee(id, name, email, password, age, rate, numberOfRates, yearsOfExperience, availability, typeOfAccount);
  }
}
