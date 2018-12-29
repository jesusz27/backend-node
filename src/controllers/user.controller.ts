import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";
import { UserOutputDto } from "../dtos/userOutput.dto";
import { UserInputDto } from "../dtos/userInput.dto";
import { UserService } from "../services/user.service";
import { HttpMessages } from "../util/http-messages.enum";
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
    user ? res.status(HttpStatusCode.OK).json(userOutputDto) : res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.USER_NOT_FOUND });
  }
  async findAll(req: Request, res: Response): Promise<any> {
    const user: User[] = await this.userResource.findAll();
    const userOutputDto: UserOutputDto[] = this.converterModelsToDtosService.toArrayUserOutputDto(user);
    user ? res.status(HttpStatusCode.OK).json(userOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
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
      user ? res.status(HttpStatusCode.OK).json(userUpdate) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    } else {
      res.status(HttpStatusCode.CONFLICT).json({ message: HttpMessages.EXIST_USER_IDNOTIFICATION });
    }
  }
  async updateAvatar(req: any, res: Response): Promise<any> {
    const idUser: string = req.params.idUser;
    const upload: string = await this.userService.uploadAvatar(req);
    const user: User = await this.userResource.findByIdUser(idUser);
    console.log(idUser);
    console.log(user);
    if (upload && User) {
      const newUser: User = await this.userResource.updateAvatar(user.getId(), upload);
      newUser ? res.status(HttpStatusCode.OK).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    }
  }
  async updatePassword(req: Request, res: Response): Promise<any> {
    const userDto: UserInputDto = req.body;
    console.log(userDto);
    const user: User = await this.userResource.findByIdUserAndPassword(userDto);
    console.log(user);
    if (user) {
      const newPassword: User = await this.userResource.updatePassword(user.getId(), userDto.newPassword);
      newPassword ? res.status(HttpStatusCode.OK).json(newPassword) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.INVALID_USER_OR_PASSWORD });
    }
  }
}
