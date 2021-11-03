import { UserTypeORM } from "../user.typeorm";
import { Entity, Unique } from "typeorm";

@Entity('contractors')
@Unique('UQ_contractors_user_id', ['user_id.value'])
export class ContractorTypeORM extends UserTypeORM {

}