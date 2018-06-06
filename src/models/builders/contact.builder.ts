import { User } from "../user.model";
import { Contact } from "../contact.model";

export class ContactBuilder {
    private contact: Contact;

    constructor() {
        this.contact = new Contact();
    }

    setId(id: number): ContactBuilder {
        this.contact.setId(id);
        return this;
    }
    setCodUser(codUser: User): ContactBuilder {
        this.contact.setCodUser(codUser);
        return this;
    }
    setCodContact(codContact: User): ContactBuilder {
        this.contact.setCodContact(codContact);
        return this;
    }
    getId(): number {
        return this.contact.getId();
    }
    getCodUser(): User {
        return this.contact.getCodUser();
    }
    getCodContact(): User {
        return this.contact.getCodContact();
    }
    public build() {
        return this.contact;
    }
}