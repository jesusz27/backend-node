import { Request, Response } from "express";
import { Contact } from "../models/contact.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { ContactResource } from "../resources/contact.resource";
import logger from "../util/logger";
import { ContactInputDto } from "../dtos/contactInput.dto";
import { UserResource } from "../resources/user.resource";
import { User } from "../models/user.model";

export class ContactController {
    private contactResource: ContactResource;
    private userResource: UserResource;

    constructor() {
        this.contactResource = new ContactResource();
        this.userResource = new UserResource();
    }

    async delete(req: Request, res: Response): Promise<any> {
        const contactInputDto: ContactInputDto = req.body;
            const contact: Contact[] =  await this.contactResource.findByCodUserAndCodContact(contactInputDto);
            contact ? res.status(HttpStatusCode.OK).json(contact) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}
