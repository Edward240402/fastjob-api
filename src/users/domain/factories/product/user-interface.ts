import { UserId } from "../../value-objects/user-id.value";
import { Name } from "../../value-objects/name.value";
import { Email } from "../../value-objects/email.value";
import { Password } from "../../value-objects/password.value";
import { Age } from "../../value-objects/age.value";

export interface UserInterface{
  changeId(id: UserId);
  getId(): UserId;
  getName(): Name;
  getEmail(): Email;
  getPassword(): Password;
  getAge(): Age;
  getRate(): number;
  getNumberOfRates(): number;
}