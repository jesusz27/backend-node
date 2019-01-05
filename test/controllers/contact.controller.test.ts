import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { ContactOutputDto } from "../../src/dtos/contactOutput.dto";
import { ContactInputDto } from "../../src/dtos/contactInput.dto";
import { TokenService } from "../token.service";
import logger from "../../src/util/logger";
const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/contacts";
const ID_USER = "/:idUser";
const ID = "/:id";
const STATUS = "/:status";
const userInvalid = "UserInvalid";
const idUser = "Jesusz27";
let token = "";
let tokenExpired;

const tokenService = new TokenService();

beforeAll((done) => {
    token = tokenService.createToken(idUser);
    tokenExpired = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZXN1c3oyNyIsImlhdCI6MTU0NjYwNzUwNiwiZXhwIjoxNTQ3ODE3MTA2fQ.5OgaKoHSlhEdGNltYRosyNhqwrolPQflD507TTTvDuk";
    done();
});

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + ContactOutputDto`, (done) => {
        const contactInputDto: ContactInputDto = { codUser: "Jesus1352", codContact: "Smith" };
        return request(app).post(END_POINT)
            .set("authorization", token)
            .send(contactInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const contactOutputDto: ContactOutputDto = res.body;
                expect(contactOutputDto.idUser).to.equal(contactInputDto.codContact);
                done();
            });
    });
});

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const contactInputDto: ContactInputDto = { codUser: "Jesus1352", codContact: "Smith" };
        return request(app).post(END_POINT)
            .set("authorization", tokenExpired)
            .send(contactInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const contactInputDto: ContactInputDto = { codUser: "Jesus1352", codContact: "Smith" };
        return request(app).post(END_POINT)
            .send(contactInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND} `, (done) => {
        const contactInputDto: ContactInputDto = { codUser: "Jesus1352", codContact: "asdasda" };
        return request(app).post(END_POINT)
            .set("authorization", token)
            .send(contactInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CONFLICT}`, (done) => {
        const contactInputDto: ContactInputDto = { codUser: "Jesus1352", codContact: "Smith" };
        return request(app).post(END_POINT)
            .set("authorization", token)
            .send(contactInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CONFLICT);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.OK} + ContactOutputDto[]`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const contactOutputDto: ContactOutputDto[] = res.body;
                expect(contactOutputDto[0].idUser).to.equal("Jesus1352");
                expect(contactOutputDto[0].status).to.equal("SELECTED");
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND} + ContactOutputDto[]`, (done) => {
        return request(app).get(END_POINT + "/" + userInvalid)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + STATUS, () => {
    it(`expect return: ${HttpStatusCode.OK} + ContactOutputDto`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        const status = "UNSELECTED";
        return request(app).put(END_POINT + "/" + id + "/status/" + status)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const contactOutputDto: ContactOutputDto = res.body;
                expect(contactOutputDto.status).to.equal(status);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + STATUS, () => {
    it(`expect return: ${HttpStatusCode.BAD_REQUEST}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        const status = "ASDASDAS";
        return request(app).put(END_POINT + "/" + id + "/status/" + status)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + STATUS, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        const status = "UNSELECTED";
        return request(app).put(END_POINT + "/" + id + "/status/" + status)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + STATUS, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        const status = "UNSELECTED";
        return request(app).put(END_POINT + "/" + id + "/status/" + status)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID + STATUS, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND} `, (done) => {
        const id = "IdInvalid";
        const status = "UNSELECTED";
        return request(app).put(END_POINT + "/" + id + "/status/" + status)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        return request(app).delete(END_POINT + "/" + id)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        return request(app).delete(END_POINT + "/" + id)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const id = "5b49ba1ff3dc292dc0f86437";
        return request(app).delete(END_POINT + "/" + id)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const id = "IdInvalid";
        return request(app).delete(END_POINT + "/" + id)
            .set("authorization", token)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});