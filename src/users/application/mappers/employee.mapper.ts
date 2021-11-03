import { UserIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/user.id.typeorm";
import { NameTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/name.typeorm";
import { EmailTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/email.typeorm";
import { PasswordTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/password.typeorm";
import { AgeTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/age.typeorm";
import { RateTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/rate.typeorm";
import { NumberOfRatesTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/number.of.rates.typeorm";
import { Employee } from "../../domain/entities/employee.entity";
import { EmployeeTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/employee/employee.typeorm";
import { YearsOfExperienceTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/employee/years.of.experience.typeorm";
import { AvailabilityTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/employee/availabilityTypeORM";
import { ProfessionIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/professions/profession.id.typeorm";

export class EmployeeMapper{
  public static toTypeORM(employee: Employee): EmployeeTypeORM {
    const employeeTypeORM: EmployeeTypeORM = new EmployeeTypeORM();
    employeeTypeORM.id = UserIdTypeORM.from(employee.getId().getValue());
    employeeTypeORM.name = NameTypeORM.from(employee.getName().getName());
    employeeTypeORM.email = EmailTypeORM.from(employee.getEmail().getEmail());
    employeeTypeORM.password = PasswordTypeORM.from(employee.getPassword().getPassword());
    employeeTypeORM.age = AgeTypeORM.from(employee.getAge().getAge());
    employeeTypeORM.rate = RateTypeORM.from(employee.getRate());
    employeeTypeORM.numberOfRates = NumberOfRatesTypeORM.from(employee.getNumberOfRates());
    employeeTypeORM.professionId = ProfessionIdTypeORM.from(employee.getProfessionId());
    employeeTypeORM.yearsOfExperience = YearsOfExperienceTypeORM.from(employee.getYearsOfExperience());
    employeeTypeORM.availability = AvailabilityTypeORM.from(employee.getAvailability());
    return employeeTypeORM;
  }
}