import { UserDao } from "../services/dao/user.dao";
import { User } from "../models/User.model";
import { UserDto } from "../dtos/user.dto";

export class UserResource {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    async create(userDto: UserDto): Promise<User> {
        return await this.userDao.create(userDto);
    }
    async findByIdUser(idUser: string): Promise<User> {
        return await this.userDao.findByIdUser(idUser);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userDao.findByEmail(email);
    }
    async findByIdUserAndPassword(userDtop: UserDto): Promise<User> {
        return await this.userDao.findByIdUserAndPassword(userDtop);
    }


}