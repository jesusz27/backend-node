import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { UserDto } from "../dtos/user.dto";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";
import { UserOutputDto } from "../dtos/userOutput.dto";
export class UserController {
  private userResource: UserResource;
  private converterModelsToDtosService: ConverterModelsToDtosService;
  constructor() {
    this.userResource = new UserResource();
    this.converterModelsToDtosService = new ConverterModelsToDtosService();
  }
  async findByIdUser(req: Request, res: Response): Promise<any> {
    const user: User = await this.userResource.findByIdUser(req.params.idUser);
    const UserOutputDto: UserOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
    user ? res.status(HttpStatusCode.OK).json(UserOutputDto) : res.status(HttpStatusCode.NOT_FOUND);
  }
  async findAll(req: Request, res: Response): Promise<any> {
    const user: User[] = await this.userResource.findAll();
    const UserOutputDto: UserOutputDto[] = this.converterModelsToDtosService.toArrayUserOutputDto(user);
    user ? res.status(HttpStatusCode.OK).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
}
