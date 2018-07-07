import { Contact } from "../../models/contact.model";
import { UserDao } from "./user.dao";
import { User } from "../../models/user.model";
import ContactSchema from "../../schemas/contact.schema";
import { ContactBuilder } from "../../models/builders/contact.builder";
import { ContactInputDto } from "../../dtos/contactInput.dto";
import { Document } from "mongoose";
import UserSchema from "../../schemas/user.schema";
import { UserBuilder } from "../../models/builders/user.builder";
import logger from "../../util/logger";

export class ContactDao {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    private static toContact(document: any): Contact {
        return new ContactBuilder()
            .setId(document.get("_id"))
            .setCodUser(new UserBuilder(document.get("codUser").get("idUser"))
                .setId(document.get("codUser").get("_id"))
                .build())
            .setCodContact(new UserBuilder(document.get("codContact").get("idUser"))
                .setId(document.get("codContact").get("_id"))
                .setEmail(document.get("codContact").get("email"))
                .build())
            .build();
    }
    private static toArrayContacts(documents: Document[]): Contact[] {
        const contacts: Contact[] = [];
        for (let i = 0; i < documents.length; i++) {
            contacts.push(ContactDao.toContact(documents[i]));
        }
        return contacts;
    }
    async create(contactDto: ContactInputDto): Promise<Contact> {
        const codUser: User = await this.userDao.findByIdUser(contactDto.codUser);
        const codContact: User = await this.userDao.findByIdUser(contactDto.codContact);
        if (codUser && codContact) {
            const contact: Contact = await this.findByCodUserAndCodContact(codUser, codContact);
            console.log(contact);
            if (!contact) {
                const contact: Contact = new ContactBuilder().setCodUser(new UserBuilder(codUser.getIdUser()).setId(codUser.getId()).setPassword(codUser.getPassword()).setEmail(codUser.getEmail()).build()).setCodContact(new UserBuilder(codContact.getIdUser()).setId(codContact.getId()).setPassword(codContact.getPassword()).setEmail(codContact.getEmail()).build()).build();
                const contactSchema = new ContactSchema(contact);
                return await contactSchema.save()
                    .then(async (contacts: Document) => {
                        const contactsDocument: any = await UserSchema.populate(contacts, { path: "codUser codContact" });
                        if (contactsDocument) {
                            return ContactDao.toContact(contactsDocument);
                        } else {
                            return undefined;
                        }
                    })
                    .catch(err => {
                        logger.error(err);
                        return undefined;
                    });
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    async findByCodUserAndCodContact(top: User, lower: User): Promise<Contact> {
        return ContactSchema.findOne({ codUser: top, codContact: lower })
            .then(async (contactsDocument: Document) => {
                return contactsDocument;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
    async findByCodUser(user: User): Promise<Contact[]> {
        return ContactSchema.find({ codUser: user })
            .then(async (contactsDocument: Document[]) => {
                const contactsPopulate: Document[] = await UserSchema.populate(contactsDocument, { path: "codUser codContact" });
                const contacts: Contact[] = contactsPopulate ? ContactDao.toArrayContacts(contactsPopulate) : undefined;
                return contacts;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
}
