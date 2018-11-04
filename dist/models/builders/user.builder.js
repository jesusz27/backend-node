"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../user.model");
class UserBuilder {
    constructor(idUser) {
        this.user = new user_model_1.User(idUser);
    }
    setId(id) {
        this.user.setId(id);
        return this;
    }
    setIdUser(idUser) {
        this.user.setIdUser(idUser);
        return this;
    }
    setPassword(password) {
        this.user.setPassword(password);
        return this;
    }
    setEmail(email) {
        this.user.setEmail(email);
        return this;
    }
    setIdNotification(idNotification) {
        this.user.setIdNotification(idNotification);
        return this;
    }
    setAvatar(avatar) {
        this.user.setAvatar(avatar);
        return this;
    }
    build() {
        return this.user;
    }
}
exports.UserBuilder = UserBuilder;
//# sourceMappingURL=user.builder.js.map