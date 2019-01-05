import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { ContactOutputDto } from "../../src/dtos/contactOutput.dto";
import { ContactInputDto } from "../../src/dtos/contactInput.dto";
import { TokenService } from "../token.service";
import logger from "../../src/util/logger";
const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/tracks";
const IDTRACK = "/:idTrack";
const IDUSER = "/:idUser";
const USER = "/user";
const CONTACT = "/contact";
const userInvalid = "UserInvalid";
const idUser = "Jesusz27";
let token = "";
let tokenExpired;
const tokenService = new TokenService();

beforeAll((done) => {
    token = tokenService.createToken(idUser);
    tokenExpired = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZXN1c3oyNyIsImlhdCI6MTU0NjYwNzUwNiwiZXhwIjoxNTQ3ODE3MTA2fQ.5OgaKoHSlhEdGNltYRosyNhqwrolPQflD507TTTvDuk";
    console.log(token);
    done();
});

describe("GET " + END_POINT + IDTRACK, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        const idTrack = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrack)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + IDTRACK, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const idTrack = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrack)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + IDTRACK, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const idTrack = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrack)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + IDTRACK, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const idTrack = "";
        return request(app).get(END_POINT + "/" + idTrack)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("GET " + END_POINT + USER + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        return request(app).get(END_POINT + USER + "/" + idUser)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + USER + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        return request(app).get(END_POINT + USER + "/" + idUser)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + USER + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        return request(app).get(END_POINT + USER + "/" + idUser)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + USER + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        return request(app).get(END_POINT + USER + "/" + userInvalid)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

describe("GET " + END_POINT + CONTACT + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        const idUser = "Jesus1352";
        return request(app).get(END_POINT + CONTACT + "/" + idUser)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + CONTACT + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const idUser = "Jesus1352";
        return request(app).get(END_POINT + CONTACT + "/" + idUser)
            .set("authorization", tokenExpired)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + CONTACT + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const idUser = "Jesus1352";
        return request(app).get(END_POINT + CONTACT + "/" + idUser)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + CONTACT + IDUSER, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        return request(app).get(END_POINT + CONTACT + "/" + userInvalid)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});