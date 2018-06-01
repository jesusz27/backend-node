import { User } from "../../models/user.model";
import logger from "../../util/logger";
import UserSchema from "../../schemas/user.schema";
import { UserBuilder } from "../../models/builders/user.builder";

export class UserDao {
    constructor() {
    }

    async create(idUser: string): Promise<User> {
        const userEntity = new UserBuilder(idUser).build();
        const user = new UserSchema(userEntity);
        return user.save()
            .then( user => {
                return new UserBuilder(user.get("name")).setId(user.get("_id")).build();
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }

}
