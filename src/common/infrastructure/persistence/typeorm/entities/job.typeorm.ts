import {Column} from "typeorm";

export class JobTypeORM {
  @Column('varchar', {name: 'job', length: 50, nullable: false })
  public job: string;

  private constructor(job: string) {
    this.job = job;
  }

  public static from(job: string) : JobTypeORM {
    return new JobTypeORM(job);
  }
}