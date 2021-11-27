import { UserType } from "../../enums/UserType";
import { UserFactory } from "../creator/abstract/user-factory";
import { ContractorFactory } from "../creator/concrete/contractor-factory";
import { EmployeeFactory } from "../creator/concrete/employee-factory";

export class UserFactoryMethod{
  public static getType(userType: UserType): UserFactory {
    if(userType == UserType.CONTRACTOR){
      return new ContractorFactory();
    }
    if(userType == UserType.EMPLOYEE){
      return new EmployeeFactory();
    }
  }
}