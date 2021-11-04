import { Column } from "typeorm";

export class YearsOfExperienceTypeORM{
  @Column('int', {name: 'years_of_experience', nullable: false, unsigned: true })
  public yearsOfExperience: number;

  private constructor(yearsOfExperience: number) {
    this.yearsOfExperience = yearsOfExperience;
  }

  public static from(yearsOfExperience: number) : YearsOfExperienceTypeORM {
    return new YearsOfExperienceTypeORM(yearsOfExperience);
  }
}