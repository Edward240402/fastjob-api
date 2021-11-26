import { NameTypeORM } from "../../infrastructure/persistence/typeorm/entities/name.typeorm";
import { EmailTypeORM } from "../../infrastructure/persistence/typeorm/entities/email.typeorm";
import { PasswordTypeORM } from "../../infrastructure/persistence/typeorm/entities/password.typeorm";
import { AgeTypeORM } from "../../infrastructure/persistence/typeorm/entities/age.typeorm";
import { RateTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/rate.typeorm";
import { NumberOfRatesTypeORM } from "../../infrastructure/persistence/typeorm/entities/number.of.rates.typeorm";
import { Employee } from "../../domain/entities/employee.entity";
import { EmployeeTypeORM } from "../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { YearsOfExperienceTypeORM } from "../../infrastructure/persistence/typeorm/entities/years.of.experience.typeorm";
import { AvailabilityTypeORM } from "../../infrastructure/persistence/typeorm/entities/availabilityTypeORM";
import { EmployeeIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/employee.id.typeorm";

export class EmployeeMapper{
  public static toTypeORM(employee: Employee): EmployeeTypeORM {
    const employeeTypeORM: EmployeeTypeORM = new EmployeeTypeORM();
    employeeTypeORM.id = EmployeeIdTypeORM.from(employee.getId().getValue());
    employeeTypeORM.name = NameTypeORM.from(employee.getName().getName());
    employeeTypeORM.email = EmailTypeORM.from(employee.getEmail().getEmail());
    employeeTypeORM.password = PasswordTypeORM.from(employee.getPassword().getPassword());
    employeeTypeORM.age = AgeTypeORM.from(employee.getAge().getAge());
    employeeTypeORM.rate = RateTypeORM.from(employee.getRate());
    employeeTypeORM.numberOfRates = NumberOfRatesTypeORM.from(employee.getNumberOfRates());
    employeeTypeORM.yearsOfExperience = YearsOfExperienceTypeORM.from(employee.getYearsOfExperience());
    employeeTypeORM.availability = AvailabilityTypeORM.from(employee.getAvailability());
    return employeeTypeORM;
  }
}