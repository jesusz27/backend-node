import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";
import { UserDto } from "../dtos/user.dto";
export class UserController {
  private userResource: UserResource;

  constructor() {
    this.userResource = new UserResource();
  }

  async create(req: Request, res: Response): Promise<any> {
    const user: User = await this.userResource.create(req.body.name);
    user ? res.status(HttpStatusCode.CREATED).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findByIdUser(req: Request, res: Response): Promise<any> {
    const user: User = await this.userResource.findByIdUser(req.params.idUser);
    user ? res.status(HttpStatusCode.OK).json(user) : res.status(HttpStatusCode.NOT_FOUND);
  }
  async findAll(req: Request, res: Response): Promise<any> {
    const user: User[] = await this.userResource.findAll();
    user ? res.status(HttpStatusCode.OK).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
}
}
