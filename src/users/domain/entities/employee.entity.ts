import { User } from "./user.entity";
import { UserId } from "../value-objects/user-id.value";
import { Name } from "../value-objects/name.value";
import { Email } from "../value-objects/email.value";
import { Password } from "../value-objects/password.value";
import { Age } from "../value-objects/age.value";
import { EmployeeRegisteredEvent } from "../events/employee-registered.event";

export class Employee extends User{
  private yearsOfExperience: number;
  private availability: string;

  public constructor(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number,
                     yearsOfExperience: number, availability: string) {
    super(id, name, email, password, age, rate, numberOfRates);
    this.yearsOfExperience = yearsOfExperience;
    this.availability = availability;
  }

  public register() {
    const event = new EmployeeRegisteredEvent(
      this.id.getValue(),
      this.name.getName(),
      this.email.getEmail(),
      this.password.getPassword(),
      this.age.getAge(),
      this.rate,
      this.numberOfRates, this.yearsOfExperience, this.availability);
    this.apply(event);
  }

  public getYearsOfExperience(): number {
    return this.yearsOfExperience;
  }

  public getAvailability(): string {
    return this.availability;
  }
}