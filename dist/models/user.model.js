"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(idUser) {
        this.idUser = idUser;
    }
    setId(id) {
        this._id = id;
    }
    setIdUser(idUser) {
        this.idUser = idUser;
    }
    setPassword(password) {
        this.password = password;
    }
    setEmail(email) {
        this.email = email;
    }
    setIdNotification(idNotification) {
        this.idNotification = idNotification;
    }
    setAvatar(avatar) {
        this.avatar = avatar;
    }
    getIdUser() {
        return this.idUser;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getIdNotification() {
        return this.idNotification;
    }
    getAvatar() {
        return this.avatar;
    }
    getId() {
        return this._id;
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map