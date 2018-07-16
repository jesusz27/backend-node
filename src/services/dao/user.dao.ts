import { User } from "../../models/user.model";
import logger from "../../util/logger";
import UserSchema from "../../schemas/user.schema";
import { UserBuilder } from "../../models/builders/user.builder";
import { UserInputDto } from "../../dtos/userInput.dto";
import { Document } from "mongoose";

export class UserDao {
    constructor() {
    }
    private static toArrayUsers(documents: Document[]): User[] {
        const users: User[] = [];
        for (let i = 0; i < documents.length; i++) {
            users.push(UserDao.toUser(documents[i]));
        }
        return users;
    }
    private static toUser(document: Document): User {
        return new UserBuilder(document.get("idUser")).setId(document.get("_id")).setEmail(document.get("email")).build();
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
    async findByEmail(email: string): Promise<User> {
        return await UserSchema.findOne({ email: email })
            .then((userDocument: Document) => {
                const user: User = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }

    async findAll(): Promise<User[]> {
        return await UserSchema.find({})
            .then( (usersDocument: Document[]) => {
                const users: User[] = usersDocument ? UserDao.toArrayUsers(usersDocument) : undefined;
                return users;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findByIdUserAndPassword(userInputDto: UserInputDto): Promise<User> {
        return await UserSchema.findOne({ idUser: userInputDto.idUser, password: userInputDto.password })
            .then((userDocument: Document) => {
                const user: User = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(userInputDto: UserInputDto): Promise<User> {
        const userEntity = new UserBuilder(userInputDto.idUser).setEmail(userInputDto.email).setPassword(userInputDto.password).build();
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
