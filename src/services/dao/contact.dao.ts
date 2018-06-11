import { Contact } from "../../models/contact.model";
import { UserDao } from "./user.dao";
import { User } from "../../models/user.model";
import ContactSchema from "../../schemas/contact.schema";
import { ContactBuilder } from "../../models/builders/contact.builder";
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

    async findByCodUserAndCodContact(top: User, lower: User): Promise<Contact[]> {
        return ContactSchema.find({ codUser: top })
            .then(async (contactsDocument: Document[]) => {
                const contactsPopulate: Document[] = await UserSchema.populate(contactsDocument, { path: "codContact" });
                const contacts: Contact[] = contactsPopulate ? ContactDao.toArrayContacts(contactsPopulate) : undefined;
                return contacts;
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
