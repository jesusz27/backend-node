"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = require("../contact.model");
class ContactBuilder {
    constructor() {
        this.contact = new contact_model_1.Contact();
    }
    setId(id) {
        this.contact.setId(id);
        return this;
    }
    setCodUser(codUser) {
        this.contact.setCodUser(codUser);
        return this;
    }
    setCodContact(codContact) {
        this.contact.setCodContact(codContact);
        return this;
    }
    setStatus(status) {
        this.contact.setStatus(status);
        return this;
    }
    getId() {
        return this.contact.getId();
    }
    getCodUser() {
        return this.contact.getCodUser();
    }
    getCodContact() {
        return this.contact.getCodContact();
    }
    getStatus() {
        return this.contact.getStatus();
    }
    build() {
        return this.contact;
    }
}
exports.ContactBuilder = ContactBuilder;
//# sourceMappingURL=contact.builder.js.map