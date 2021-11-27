import { AggregateRoot } from "@nestjs/cqrs";
import { UserId } from "../value-objects/user-id.value";
import { Name } from "../value-objects/name.value";
import { Password } from "../value-objects/password.value";
import { Age } from "../value-objects/age.value";
import { Email } from "../value-objects/email.value";
import { Rate } from "../../../rating/domain/value-objects/rate.value";
import { TypeOfAccount } from '../value-objects/type-of-account.value';

export class User extends AggregateRoot {
  protected id: UserId;
  protected name: Name;
  protected email: Email;
  protected password: Password;
  protected age: Age;
  protected rate: number;
  protected numberOfRates: number;
  protected yearsOfExperience: number;
  protected availability: string;
  protected typeOfAccount: TypeOfAccount;

  public constructor(id: UserId, name: Name, email: Email, password: Password, age: Age, rate: number, numberOfRates: number) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.rate = rate;
    this.numberOfRates = numberOfRates;
  }

  public register(){}


  public addRate(newRate: Rate){
    this.rate = Number((((this.rate * this.numberOfRates) + newRate.getRate()) / (this.numberOfRates + 1)).toFixed(1));
    this.numberOfRates++;
  }
  public changeId(id: UserId) {
    this.id = id;
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getAge(): Age {
    return this.age;
  }

  public getRate(): number{
    return this.rate;
  }

  public getNumberOfRates(): number {
    return this.numberOfRates;
  }

  public getYearsOfExperience(): number {
    return this.yearsOfExperience;
  }

  public getAvailability(): string {
    return this.availability;
  }
  public getTypeOfAccount(): TypeOfAccount {
    return this.typeOfAccount;
  }
}