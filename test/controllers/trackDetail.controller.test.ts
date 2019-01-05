import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { ContactOutputDto } from "../../src/dtos/contactOutput.dto";
import { ContactInputDto } from "../../src/dtos/contactInput.dto";
import { TokenService } from "../token.service";
import logger from "../../src/util/logger";
const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/trackDetails";
const ID_TRACK_DETAIL = "/:idTrackDetail";
const ID = "/ID";
const IDS = "/:ID";
let token = "";
let tokenInvalid;
const tokenService = new TokenService();

beforeAll((done) => {
    token = tokenService.createToken("jesusz27");
    tokenInvalid = "..5OgaKoHSlhEdGNltYRosyNhqwrolPQflD507TTTvDuk";
    done();
});

describe("GET " + END_POINT + ID_TRACK_DETAIL, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        const idTrackDetail = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrackDetail)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_TRACK_DETAIL, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const idTrackDetail = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrackDetail)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_TRACK_DETAIL, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const idTrackDetail = "ASWDSDS4S45A4SW4S5W4";
        return request(app).get(END_POINT + "/" + idTrackDetail)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID_TRACK_DETAIL, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const idTrackDetail = "";
        return request(app).get(END_POINT + "/" + idTrackDetail)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});


describe("GET " + END_POINT + ID + IDS, () => {
    it(`expect return: ${HttpStatusCode.OK}`, (done) => {
        const id = "5b49ba1ff3cd192dc0f86437";
        return request(app).get(END_POINT + ID + "/" + id)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.OK);
                done();
            });
    });
});

describe("GET " + END_POINT + ID + IDS, () => {
    it(`expect return: ${HttpStatusCode.UNAUTHORIZED}`, (done) => {
        const id = "5b49ba1ff3cd192dc0f86437";
        return request(app).get(END_POINT + ID + "/" + id)
            .set("authorization", tokenInvalid)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.UNAUTHORIZED);
                done();
            });
    });
});

describe("GET " + END_POINT + ID + IDS, () => {
    it(`expect return: ${HttpStatusCode.FORBIDDEN}`, (done) => {
        const id = "5b49ba1ff3cd192dc0f86437";
        return request(app).get(END_POINT + ID + "/" + id)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.FORBIDDEN);
                done();
            });
    });
});

describe("GET " + END_POINT + ID + IDS, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const id = "5b49ba1ff3cd192dc0f86111";
        return request(app).get(END_POINT + ID + "/" + id)
            .set("authorization", token)
            .end(async (err, res) => {
                const user: any = res.body;
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});
