import { UserDao } from "../services/dao/user.dao";
import { User } from "../models/User.model";

export class UserResource {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    async create(name: string): Promise<User> {
        return await this.userDao.create(name);
    }

}