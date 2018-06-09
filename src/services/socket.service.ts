import { Contact } from "../models/contact.model";
import { ContactResource } from "../resources/contact.resource";
import { UserDto } from "../dtos/user.dto";
import { TrackInputDto } from "../dtos/trackInput.dto";
import { TrackDetailDao } from "../services/dao/trackDetail.dao";
import { TrackDetail } from "../models/trackDetail.model";
import { LocationDto } from "../dtos/location.dto";
export class SocketService {
    private contactResource: ContactResource;
    private trackDetailDao: TrackDetailDao;
    constructor() {
        this.contactResource = new ContactResource();
        this.trackDetailDao = new TrackDetailDao();
    }
    async findByCodUser(userDto: UserDto): Promise<string[]> {
        const contact: Contact[] = await this.contactResource.findByCodUser(userDto);
        const contactStr: string[] = [];
        for (let i = 0; i < contact.length; i++) {
            contactStr.push(contact[i].getCodContact().getIdUser());
        }
        return contactStr;
    }
    async addTrackDetail(trackInput: TrackInputDto): Promise<string> {
        const trackDetailSearch: TrackDetail = await this.trackDetailDao.findByIdTrack(trackInput.idTrack);
        let trackDetail: TrackDetail = undefined;
        if (!trackDetailSearch) {
            trackDetail = await this.trackDetailDao.create(trackInput);
        } else {
            const locationBD: Location[] = JSON.parse(trackDetailSearch.getLocationStorage());
            const location: Location = JSON.parse(trackInput.location);
            locationBD.push(location);
            trackDetail = await this.trackDetailDao.update(trackDetailSearch.getId(), JSON.stringify(locationBD));
        }
        return JSON.stringify(trackDetail);
    }
}
