import {Column} from "typeorm";

export class AvailabilityTypeORM {
  @Column('varchar', {name: 'availability', length: 25, nullable: false })
  public availability: string;

  private constructor(availability: string) {
    this.availability = availability;
  }

  public static from(availability: string) : AvailabilityTypeORM {
    return new AvailabilityTypeORM(availability);
  }
}