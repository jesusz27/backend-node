import { User } from "../../models/user.model";
import logger from "../../util/logger";
import UserSchema from "../../schemas/user.schema";
import { UserBuilder } from "../../models/builders/user.builder";
import { Document } from "mongoose";

export class UserDao {
    constructor() {
    }
    private static toUser(document: Document): User {
        return new UserBuilder(document.get("idUser")).setId(document.get("_id")).build();
    }
    async findByIdUser(idUser: string): Promise<User> {
        return await UserSchema.findOne({ idUser: idUser })
            .then((userDocument: Document) => {
                const user: User = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(idUser: string): Promise<User> {
        const userEntity = new UserBuilder(idUser).build();
        const user = new UserSchema(userEntity);
        return user.save()
            .then((userDocument: Document) => {
                const user: User = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }


}
