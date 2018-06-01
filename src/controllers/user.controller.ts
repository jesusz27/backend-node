import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { User } from "../models/user.model";
import { UserResource } from "../resources/user.resource";

export class UserController {
  private userResource: UserResource;

  constructor() {
    this.userResource = new UserResource();
  }

  async create(req: Request, res: Response): Promise<any> {
    const user: User = await this.userResource.create(req.body.name);
    user ? res.status(HttpStatusCode.CREATED).json(user) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }

}
