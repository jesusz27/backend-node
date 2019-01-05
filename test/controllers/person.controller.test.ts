import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { ContactOutputDto } from "../../src/dtos/contactOutput.dto";
import { PersonInputDto } from "../../src/dtos/personInput.dto";
import { TokenService } from "../token.service";
import logger from "../../src/util/logger";
const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/persons";
const ID_USER = "/:idUser";
const userInvalid = "UserInvalid";
const idUser = "Jesusz27";
let token = "";
let tokenInvalid;

const tokenService = new TokenService();

beforeAll((done) => {
    token = tokenService.createToken(idUser);
    tokenInvalid = "..5OgaKoHSlhEdGNltYRosyNhqwrolPQflD507TTTvDuk";
    done();
});

describe("POST " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.CREATED}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea", phone: 612589625 };
        return request(app).post(END_POINT + "/" + idUser)
            .set("authorization", token)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                done();
            });
    });
});

describe("POST " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea", phone: 612589625 };
        return request(app).post(END_POINT + "/" + idUser)
            .set("authorization", tokenInvalid)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("POST " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea", phone: 612589625 };
        return request(app).post(END_POINT + "/" + idUser)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("POST " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea", phone: 612589625 };
        return request(app).post(END_POINT + "/" + userInvalid)
            .set("authorization", token)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        return request(app).get(END_POINT + "/" + idUser)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        return request(app).get(END_POINT + "/" + userInvalid)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea2", phone: 612589625 };
        return request(app).put(END_POINT + "/" + idUser)
            .set("authorization", token)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea2", phone: 612589625 };
        return request(app).put(END_POINT + "/" + idUser)
            .set("authorization", tokenInvalid)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea2", phone: 612589625 };
        return request(app).put(END_POINT + "/" + idUser)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("PUT " + END_POINT + ID_USER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const personInputDto: PersonInputDto = { firstName: "Jesus", lastName: "Zea2", phone: 612589625 };
        return request(app).put(END_POINT + "/" + userInvalid)
            .set("authorization", token)
            .send(personInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});