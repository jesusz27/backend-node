import { User } from "../models/user.model";
import { Request, Response } from "express";
import { TOKEN_SECRET } from "../util/secrets";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { HttpMessages } from "../util/http-messages.enum";
const jwt = require("jwt-simple");
const moment = require("moment");
export class TokenService {
    constructor() {
    }
    createToken(user: User): string {
        const payload = {
            sub: user.getIdUser(),
            iat: moment().unix(),
            exp: moment().add(14, "days").unix(),
        };
        return jwt.encode(payload, TOKEN_SECRET);
    }
    async isAuth(req: Request, res: Response, next: any): Promise<any> {
        if (!req.headers.authorization) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: HttpMessages.NO_TOKEN });
        }
        const token = req.headers.authorization;
        const segments = token.split(".");
        if (segments.length != 3) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: HttpMessages.TOKEN_INVALID });
        }
        try {
            const payload = jwt.decode(token, TOKEN_SECRET);
            if (payload.exp <= moment().unix()) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: HttpMessages.TOKEN_EXPIRED });
            }
            req.user = payload.sub;
        } catch (error) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: HttpMessages.TOKEN_INVALID });
        }
        next();
    }
}