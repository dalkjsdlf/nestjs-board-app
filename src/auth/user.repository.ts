import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
}