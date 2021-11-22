import { Column } from 'typeorm';
export class StateTypeORM {
  @Column('varchar', { name: 'state', length: 50, nullable: false })
  public state: string;

  private constructor(state: string) {
    this.state = state;
  }

  public static from(state: string) : StateTypeORM {
    return new StateTypeORM(state);
  }
}