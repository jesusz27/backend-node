import { TrackInputDto } from "../../dtos/trackInput.dto";
import { Track } from "../../models/track.model";
import { TrackBuilder } from "../../models/builders/track.builder";
import TrackSchema from "../../schemas/track.schema";
import logger from "../../util/logger";
import { Document } from "mongoose";
export class TrackDao {
    constructor() {

    }
    private static toTrack(document: Document): Track {
        return new TrackBuilder().setId(document.get("_id")).setCodUser(document.get("codUser")).build();
    }
    async create(trackInputDto: TrackInputDto): Promise<Track> {
        const TrackEntity = new TrackBuilder().setCodUser(trackInputDto.codUser).setCodContact(trackInputDto.codContact).setTrackDetail(trackInputDto.trackDetail).build();
        const Track = new TrackSchema(TrackEntity);
        return Track.save()
            .then((trackDocument: Document) => {
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
}