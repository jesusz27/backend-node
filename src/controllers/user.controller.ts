import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";
import { UserOutputDto } from "../dtos/userOutput.dto";
import { UserInputDto } from "../dtos/userInput.dto";
import { UserService } from "../services/user.service";
export class UserController {
  private userResource: UserResource;
  private converterModelsToDtosService: ConverterModelsToDtosService;
  private userService: UserService;
  constructor() {
    this.userResource = new UserResource();
    this.converterModelsToDtosService = new ConverterModelsToDtosService();
    this.userService = new UserService();
  }
  async findByIdUser(req: Request, res: Response): Promise<any> {
    const user: User = await this.userResource.findByIdUser(req.params.idUser);
    const userOutputDto: UserOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
    user ? res.status(HttpStatusCode.OK).json(userOutputDto) : res.status(HttpStatusCode.NOT_FOUND);
  }
  async findAll(req: Request, res: Response): Promise<any> {
    const user: User[] = await this.userResource.findAll();
    const userOutputDto: UserOutputDto[] = this.converterModelsToDtosService.toArrayUserOutputDto(user);
    user ? res.status(HttpStatusCode.OK).json(userOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async updateIdNotification(req: Request, res: Response): Promise<any> {
    const userDto: UserInputDto = req.body;
    console.log(req.body);
    const user: User = await this.userResource.findByIdUserAndIdNotification(userDto);
    if (!user) {
      const previousUser: User = await this.userResource.findByIdNotification(userDto.idNotification);
      if (previousUser) await this.userResource.deleteIdNotification(previousUser.getId());
      const user: User = await this.userResource.findByIdUser(userDto.idUser);
      const userUpdate: User = await this.userResource.updateIdNotification(user.getId(), userDto.idNotification);
      user ? res.status(HttpStatusCode.OK).json(userUpdate) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    } else {
      res.status(HttpStatusCode.NOT_FOUND).end();
    }
  }
  async updateAvatar(req: any, res: Response): Promise<any> {
    const upload: boolean = await this.userService.findByCodUser(req);
    if (upload) {
      res.status(HttpStatusCode.OK).json(upload);
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
  }
}
