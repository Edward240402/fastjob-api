import { User } from "./user.entity";
import { UserId } from "../value-objects/users/user-id.value";
import { Name } from "../value-objects/users/name.value";
import { Email } from "../value-objects/users/email.value";
import { Password } from "../value-objects/users/password.value";
import { Age } from "../value-objects/users/age.value";
import { EmployeeRegisteredEvent } from "../events/employee-registered.event";

export class Employee extends User{
  private professionId: number;
  private yearsOfExperience: number;
  private availability: string;

  public constructor(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number,
                     professionId: number, yearsOfExperience: number, availability: string) {
    super(id, name, email, password, age, rate, numberOfRates);
    this.professionId = professionId;
    this.yearsOfExperience = yearsOfExperience;
    this.availability = availability;
  }

  public register() {
    const event = new EmployeeRegisteredEvent(this.id.getValue(), this.name.getName(), this.email.getEmail(), this.password.getPassword(), this.age.getAge(), this.rate, this.numberOfRates, this.professionId, this.yearsOfExperience, this.availability);
    this.apply(event);
  }

  public getProfessionId(): number {
    return this.professionId;
  }

  public getYearsOfExperience(): number {
    return this.yearsOfExperience;
  }

  public getAvailability(): string {
    return this.availability;
  }
}