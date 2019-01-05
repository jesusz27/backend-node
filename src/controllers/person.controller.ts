import { Request, Response } from "express";
import { Person } from "../models/person.model";
import { PersonInputDto } from "../dtos/personInput.dto";
import { PersonResource } from "../resources/person.resource";
import { UserResource } from "../resources/user.resource";
import { User } from "../models/user.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { HttpMessages } from "../util/http-messages.enum";
export class PersonController {
    userResource: UserResource;
    personResource: PersonResource;
    constructor() {
        this.userResource = new UserResource();
        this.personResource = new PersonResource();
    }
    async create(req: Request, res: Response): Promise<any> {
        const user: User = await this.userResource.findByIdUser(req.params.idUser);
        if (user) {
            const person: Person = await this.personResource.findByUser(user.getId());
            if (!person) {
                const personDto: PersonInputDto = req.body;
                const person: Person = await this.personResource.create(personDto, req.params.idUser);
                person ? res.status(HttpStatusCode.CREATED).json(person) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
            } else {
                res.status(HttpStatusCode.CONFLICT).json({ message: HttpMessages.EXIST_USER_PROFILE });
            }
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.USER_NOT_FOUND });
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const user: User = await this.userResource.findByIdUser(req.params.idUser);
        if (user) {
            const persona: Person = await this.personResource.findByUser(user.getId());
            if (persona) {
                const personDto: PersonInputDto = req.body;
                personDto._id = persona.getId();
                const person: Person = await this.personResource.update(personDto);
                person ? res.status(HttpStatusCode.OK).json(person) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: HttpMessages.INTERNAL_SERVER_ERROR });
            } else {
                res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.PERFIL_NOT_FOUND });
            }
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.USER_NOT_FOUND });
        }
    }
    async findByIdUser(req: Request, res: Response): Promise<any> {
        const user: User = await this.userResource.findByIdUser(req.params.idUser);
        if (user) {
            const person: Person = await this.personResource.findByUser(user.getId());
            person ? res.status(HttpStatusCode.OK).json(person) : res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.PERFIL_NOT_FOUND });
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({ message: HttpMessages.USER_NOT_FOUND });
        }
    }
}