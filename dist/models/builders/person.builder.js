"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_model_1 = require("../person.model");
class PersonBuilder {
    constructor() {
        this.person = new person_model_1.Person();
    }
    setId(id) {
        this.person.setId(id);
        return this;
    }
    setFirstName(firstName) {
        this.person.setFirstName(firstName);
        return this;
    }
    setLastName(lastName) {
        this.person.setLastName(lastName);
        return this;
    }
    setBirthdate(birthdate) {
        this.person.setBirthdate(birthdate);
        return this;
    }
    setPhone(phone) {
        this.person.setPhone(phone);
        return this;
    }
    setUser(user) {
        this.person.setUser(user);
        return this;
    }
    build() {
        return this.person;
    }
}
exports.PersonBuilder = PersonBuilder;
//# sourceMappingURL=person.builder.js.map