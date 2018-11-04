"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contact {
    constructor() {
    }
    getId() {
        return this._id;
    }
    getCodUser() {
        return this.codUser;
    }
    getCodContact() {
        return this.codContact;
    }
    getStatus() {
        return this.status;
    }
    setId(id) {
        this._id = id;
    }
    setCodUser(codUser) {
        this.codUser = codUser;
    }
    setCodContact(codContact) {
        this.codContact = codContact;
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.model.js.map