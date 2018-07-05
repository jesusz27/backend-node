import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { UserDto } from "../dtos/user.dto";
export class AuthController {
    private userResource: UserResource;

    constructor() {
        this.userResource = new UserResource();
    }

    async logIn(req: Request, res: Response): Promise<any> {
        const userDto: UserDto = req.body;
        const user: User = await this.userResource.findByIdUserAndPassword(userDto);
        user ? res.status(HttpStatusCode.OK).json(user) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async signUp(req: Request, res: Response): Promise<any> {
        const idUser: User = await this.userResource.findByIdUser(req.body.idUser);
        const email: User = await this.userResource.findByEmail(req.body.email);
        if (!idUser && !email) {
            const userDto: UserDto = req.body;
            const user: User = await this.userResource.create(userDto);
            user ? res.status(HttpStatusCode.CREATED).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }

    }

}
