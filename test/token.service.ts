
import { TOKEN_SECRET } from "../src/util/secrets";
const jwt = require("jwt-simple");
const moment = require("moment");
export class TokenService {
    constructor() {
    }
    createToken(idUser: String): string {
        const payload = {
            sub: idUser,
            iat: moment().unix(),
            exp: moment().add(14, "days").unix(),
        };
        return jwt.encode(payload, TOKEN_SECRET);
    }
}