"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConverterModelsToDtosService {
    constructor() {
    }
    toContactOutputDto(contact) {
        let contactOutputDto = undefined;
        if (contact) {
            const user = contact.getCodContact();
            contactOutputDto = {
                id: contact.getId(),
                idUser: user.getIdUser(),
                email: user.getEmail(),
                status: contact.getStatus(),
                avatar: user.getAvatar(),
            };
        }
        return contactOutputDto;
    }
    toArrayContactOutputDto(contact) {
        const contactOutputDto = [];
        if (contact.length > 0) {
            for (let i = 0; i < contact.length; i++) {
                contactOutputDto.push(this.toContactOutputDto(contact[i]));
            }
        }
        return contactOutputDto;
    }
    toUserOutputDto(user) {
        let userOutputDto = undefined;
        if (user) {
            userOutputDto = {
                idUser: user.getIdUser(),
                email: user.getEmail(),
                avatar: user.getAvatar(),
            };
        }
        return userOutputDto;
    }
    toArrayUserOutputDto(user) {
        const userOutputDto = [];
        if (user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                userOutputDto.push(this.toUserOutputDto(user[i]));
            }
        }
        return userOutputDto;
    }
}
exports.ConverterModelsToDtosService = ConverterModelsToDtosService;
//# sourceMappingURL=converterModelsToDtos.service.js.map