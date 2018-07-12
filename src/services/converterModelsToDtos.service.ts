
import { ContactOutputDto } from "../dtos/contactOutput.dto";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
export class ConverterModelsToDtosService {


    constructor() {
    }
    toRelationOutputDto(contact: Contact[]): ContactOutputDto[] {
        const contactOutputDto: ContactOutputDto[] = [];
        if (contact.length > 0) {
            for (let i = 0; i < contact.length; i++) {
                const user: User = contact[i].getCodContact();
                contactOutputDto.push({ id: contact[i].getId(), idUser: user.getIdUser(), email: user.getEmail(), status: contact[i].getStatus() });
            }
        }
        return contactOutputDto;
    }
}