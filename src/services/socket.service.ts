import { Contact } from "../models/contact.model";
import { ContactResource } from "../resources/contact.resource";
import { UserDto } from "../dtos/user.dto";
export class SocketService {
    private contactResource: ContactResource;
    constructor() {
        this.contactResource = new ContactResource();
    }
    async findByCodUser(userDto: UserDto): Promise<string[]> {
        const contact: Contact[] = await this.contactResource.findByCodUser(userDto);
        const contactStr: string[] = [];
        for (let i = 0; i < contact.length; i++) {
            contactStr.push(contact[i].getCodContact().getIdUser());
        }
        return contactStr;
    }
}
