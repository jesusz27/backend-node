import { ContactDao } from "../services/dao/contact.dao";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import logger from "../util/logger";
import { ContactInputDto } from "../dtos/contactInput.dto";
import { UserDto } from "../dtos/user.dto";
export class ContactResource {
    private contactDao: ContactDao;
    private userResource: UserResource;
    constructor() {
        this.contactDao = new ContactDao();
        this.userResource = new UserResource();
    }
    async findByCodUserAndCodContact(contactInputDto: ContactInputDto): Promise<Contact[]> {
        const topUser: User = await this.userResource.findByIdUser(contactInputDto.codUser);
        const lowerUser: User = await this.userResource.findByIdUser(contactInputDto.codContact);
        return this.contactDao.findByCodUserAndCodContact(topUser, lowerUser);
    }
    async findByCodUser(userDto: UserDto): Promise<Contact[]> {
        const user: User = await this.userResource.findByIdUser(userDto.idUser);
        return this.contactDao.findByCodUser(user);
    }
}

