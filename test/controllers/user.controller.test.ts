import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { UserOutputDto } from "../../src/dtos/userOutput.dto";
import { TokenService } from "../token.service";
import { UserBuilder } from "../../src/models/builders/user.builder";
import { UserInputDto } from "../../src/dtos/userInput.dto";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/users";
const ID = "/:idUser";
const AVATAR = "/avatar";
const ID_NOTIFICATION = "/idNotification";
const PASSWORD = "/password";
const userInvalid = "UserInvalid";
const idUser = "Jesusz27";

let token = "";
let tokenInvalid;
const tokenService = new TokenService();
beforeAll((done) => {
    token = tokenService.createToken("jesusz27");
    tokenInvalid = "..5OgaKoHSlhEdGNltYRosyNhqwrolPQflD507TTTvDuk";
    done();
});

describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.OK} + UserOutputDto[]`, (done) => {
        return request(app).get(END_POINT)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const userOutputDto: UserOutputDto[] = res.body;
                expect(userOutputDto.length).to.be.above(2);
                done();
            });
    });
});

describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        return request(app).get(END_POINT)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN} `, (done) => {
        return request(app).get(END_POINT)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + UserOutputDto`, (done) => {
        const idUser = "Jesusz27";
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const userOutputDto: UserOutputDto = res.body;
                expect(userOutputDto.idUser).to.equal(idUser);
                done();
            });
    });
});

describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        return request(app).get(END_POINT + "/" + userInvalid)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + AVATAR, () => {
    it(`expect return: ${HttpStatusCode.OK} `, (done) => {
        const filePath = `${__dirname}/../../dist/uploads/default.png`;
        return request(app).put(END_POINT + "/" + idUser + AVATAR)
            .set("authorization", token)
            .attach("avatar", filePath)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + AVATAR, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED} `, (done) => {
        const filePath = `${__dirname}/../../dist/uploads/default.png`;
        return request(app).put(END_POINT + "/" + idUser + AVATAR)
            .set("authorization", tokenInvalid)
            .attach("avatar", filePath)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + AVATAR, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN} `, (done) => {
        const filePath = `${__dirname}/../../dist/uploads/default.png`;
        return request(app).put(END_POINT + "/" + idUser + AVATAR)
            .attach("avatar", filePath)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + AVATAR, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND} `, (done) => {
        const filePath = `${__dirname}/../../dist/uploads/default.png`;
        return request(app).put(END_POINT + "/" + userInvalid + AVATAR)
            .set("authorization", token)
            .attach("avatar", filePath)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("PATCH " + END_POINT + ID_NOTIFICATION, () => {
    it(`expect return: ${HttpStatusCode.OK} `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, idNotification: "a07d843c-080c-4c5a-b6d6-ee9b82c6f749" };
        return request(app).patch(END_POINT + ID_NOTIFICATION)
            .set("authorization", token)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("PATCH " + END_POINT + ID_NOTIFICATION, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED} `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, idNotification: "a07d843c-080c-4c5a-b6d6-ee9b82c6f749" };
        return request(app).patch(END_POINT + ID_NOTIFICATION)
            .set("authorization", tokenInvalid)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("PATCH " + END_POINT + ID_NOTIFICATION, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN} `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, idNotification: "a07d843c-080c-4c5a-b6d6-ee9b82c6f749" };
        return request(app).patch(END_POINT + ID_NOTIFICATION)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("PATCH " + END_POINT + ID_NOTIFICATION, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND} `, (done) => {
        const userInputDto: UserInputDto = { idUser: userInvalid, idNotification: "a07d843c-080c-4c5a-b6d6-ee9b82c6f749" };
        return request(app).patch(END_POINT + ID_NOTIFICATION)
            .set("authorization", token)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("PATCH " + END_POINT + ID_NOTIFICATION, () => {
    it(`expect return: ${HttpStatusCode.CONFLICT} `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, idNotification: "a07d843c-080c-4c5a-b6d6-ee9b82c6f749" };
        return request(app).patch(END_POINT + ID_NOTIFICATION)
            .set("authorization", token)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CONFLICT);
                done();
            });
    });
});

describe("PATCH " + END_POINT + PASSWORD, () => {
    it(`expect return: ${HttpStatusCode.OK}  `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, password: "1234a", newPassword: "12345" };
        return request(app).patch(END_POINT + PASSWORD)
            .send(userInputDto)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("PATCH " + END_POINT + PASSWORD, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}  `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, password: "12345", newPassword: "12345" };
        return request(app).patch(END_POINT + PASSWORD)
            .send(userInputDto)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("PATCH " + END_POINT + PASSWORD, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}  `, (done) => {
        const userInputDto: UserInputDto = { idUser: idUser, password: "12345", newPassword: "12345" };
        return request(app).patch(END_POINT + PASSWORD)
            .send(userInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("PATCH " + END_POINT + PASSWORD, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}  `, (done) => {
        const userInputDto: UserInputDto = { idUser: userInvalid, password: "12345", newPassword: "12345" };
        return request(app).patch(END_POINT + PASSWORD)
            .send(userInputDto)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

