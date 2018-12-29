import { Request, Response } from "express";
import { Contact } from "../models/contact.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { ContactResource } from "../resources/contact.resource";
import logger from "../util/logger";
import { ContactInputDto } from "../dtos/contactInput.dto";
import { UserResource } from "../resources/user.resource";
import { User } from "../models/user.model";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";
import { ContactOutputDto } from "../dtos/contactOutput.dto";
import { HttpMessages } from "../util/http-messages.enum";
export class ContactController {
    private contactResource: ContactResource;
    private userResource: UserResource;
    private converterModelsToDtosService: ConverterModelsToDtosService;

    constructor() {
        this.contactResource = new ContactResource();
        this.userResource = new UserResource();
        this.converterModelsToDtosService = new ConverterModelsToDtosService();
    }
    async create(req: Request, res: Response): Promise<any> {
        const contactInputDto: ContactInputDto = req.body;
        const contact: Contact = await this.contactResource.create(contactInputDto);
        const contactOutputDto: ContactOutputDto = this.converterModelsToDtosService.toContactOutputDto(contact);
        contact ? res.status(HttpStatusCode.CREATED).json(contactOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    }
    async findByCodUser(req: Request, res: Response): Promise<any> {
        const idUser: string = req.params.idUser;
        const contact: Contact[] = await this.contactResource.findByCodUser(idUser);
        contact ? res.status(HttpStatusCode.OK).json(this.converterModelsToDtosService.toArrayContactOutputDto(contact)) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const status: string = req.params.status;
        const contact: Contact = await this.contactResource.findById(id);
        if (contact) {
            const contact: Contact = await this.contactResource.update(id, status);
            const contactOutputDto: ContactOutputDto = this.converterModelsToDtosService.toContactOutputDto(contact);
            contact ? res.status(HttpStatusCode.OK).json(contactOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.IVALID_IDCONTACT});
        }
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const contact: Contact = await this.contactResource.findById(id);
        if (contact) {
            const success: boolean = await this.contactResource.delete(id);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
