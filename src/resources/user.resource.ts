import { UserDao } from "../services/dao/user.dao";
import { User } from "../models/user.model";
import { UserInputDto } from "../dtos/userInput.dto";

export class UserResource {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    async create(userInputDto: UserInputDto): Promise<User> {
        return await this.userDao.create(userInputDto);
    }
    async findByIdUser(idUser: string): Promise<User> {
        return await this.userDao.findByIdUser(idUser);
    }
    async findByEmail(email: string): Promise<User> {
        return await this.userDao.findByEmail(email);
    }
    async findAll(): Promise<User[]> {
        return await this.userDao.findAll();
    }
    async findByIdUserAndPassword(userInputDto: UserInputDto): Promise<User> {
        return await this.userDao.findByIdUserAndPassword(userInputDto);
    }


}