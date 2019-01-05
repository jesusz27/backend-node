import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { UserInputDto } from "../dtos/userInput.dto";
import { UserOutputDto } from "../dtos/userOutput.dto";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";
import { HttpMessages } from "../util/http-messages.enum";
import { TokenService } from "../services/token.service";
export class AuthController {
    private userResource: UserResource;
    private converterModelsToDtosService: ConverterModelsToDtosService;
    private tokenService: TokenService;
    constructor() {
        this.userResource = new UserResource();
        this.converterModelsToDtosService = new ConverterModelsToDtosService();
        this.tokenService = new TokenService();
    }

    async logIn(req: Request, res: Response): Promise<any> {
        const userDto: UserInputDto = req.body;
        const user: User = await this.userResource.findByIdUserAndPassword(userDto);
        const userOutputDto: UserOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
        if (user) {
            const token = this.tokenService.createToken(user);
            res.setHeader("token", token);
            res.status(HttpStatusCode.OK).json(userOutputDto);
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.INVALID_USER_OR_PASSWORD });
        }
    }
    async singUp(req: Request, res: Response): Promise<any> {
        const idUser: User = await this.userResource.findByIdUser(req.body.idUser);
        const email: User = await this.userResource.findByEmail(req.body.email);
        if (!idUser && !email) {
            if (req.body.idUser && req.body.email && req.body.password) {
                const userDto: UserInputDto = req.body;
                const user: User = await this.userResource.create(userDto);
                const userOutputDto: UserOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
                user ? res.status(HttpStatusCode.CREATED).json(userOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
            } else {
                res.status(HttpStatusCode.BAD_REQUEST).json({ message: HttpMessages.EMPTY_FIELDS });
            }
        } else {
            res.status(HttpStatusCode.CONFLICT).json({ message: HttpMessages.EXIST_USER_EMAIL });
        }
    }

}
