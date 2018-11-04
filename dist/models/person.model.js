"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor() {
    }
    setId(id) {
        this._id = id;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    setBirthdate(birthdate) {
        this.birthdate = birthdate;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    setUser(user) {
        this.user = user;
    }
    getId() {
        return this._id;
    }
    getLastName() {
        return this.lastName;
    }
    getFirstName() {
        return this.firstName;
    }
    getBirthdate() {
        return this.birthdate;
    }
    getPhone() {
        return this.phone;
    }
    getUser() {
        return this.user;
    }
}
exports.Person = Person;
//# sourceMappingURL=person.model.js.map