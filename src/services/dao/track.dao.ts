import { TrackInputDto } from "../../dtos/trackInput.dto";
import { Track } from "../../models/track.model";
import { TrackDetail } from "../../models/trackDetail.model";
import  TrackSchema  from "../../schemas/track.schema";
import  UserSchema  from "../../schemas/user.schema";
import { TrackBuilder } from "../../models/builders/track.builder";
import { UserBuilder } from "../../models/builders/user.builder";
import logger from "../../util/logger";
import { Document } from "mongoose";
export class TrackDao {
    constructor() {

    }
  /*  private static toTrack(document: Document): Track {
        return new TrackBuilder().setId(document.get("_id")).setCodUser(document.get("codUser")).build();
    }*/
    private static toTrack(document: any): Track {
        return new TrackBuilder()
            .setId(document.get("_id"))
            .setCodUser(new UserBuilder(document.get("codUser").get("idUser"))
                .setId(document.get("codUser").get("_id"))
                .build())
            .setCodContact(new UserBuilder(document.get("codContact").get("idUser"))
                .setId(document.get("codContact").get("_id"))
                .build())
            .build();
    }
    private static toArrayContacts(documents: Document[]): Track[] {
        const track: Track[] = [];
        for (let i = 0; i < documents.length; i++) {
            track.push(TrackDao.toTrack(documents[i]));
        }
        return track;
    }
    async create(trackInputDto: TrackInputDto): Promise<Track> {
        const TrackEntity = new TrackBuilder().setCodUser(trackInputDto.codUser).setCodContact(trackInputDto.codContact).setTrackDetail(trackInputDto.trackDetail).build();
        const Track = new TrackSchema(TrackEntity);
        return Track.save()
            .then(async (trackDocument: Document) => {
                const trackPopulate: any = await UserSchema.populate(trackDocument, { path: "codUser codContact" });
                const track: Track = trackDocument ? TrackDao.toTrack(trackDocument) : undefined;
                console.log("TRack Dao");
                console.log(trackDocument);
                return track;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
    async findByTrackDetail(trackDetail: TrackDetail): Promise<Track[]> {
        return TrackSchema.find({ trackDetail: trackDetail })
            .then(async (trackDocument: Document[]) => {
                const trackPopulate: Document[] = await UserSchema.populate(trackDocument, { path: "codUser codContact" });
                const track: Track[] = trackPopulate ? TrackDao.toArrayContacts(trackPopulate) : undefined;
                return track;
            })
            .catch(err => {
                logger.error(err);
                return undefined;
            });
    }
}