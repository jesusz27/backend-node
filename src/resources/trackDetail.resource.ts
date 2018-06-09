import { TrackDetail } from "../models/trackDetail.model";
import logger from "../util/logger";
import { TrackInputDto } from "../dtos/trackInput.dto";
import { TrackDetailDao } from "../services/dao/trackDetail.dao";

export class TrackDetailResource {
    private trackDetailDao: TrackDetailDao;
    constructor() {
        this.trackDetailDao = new TrackDetailDao();
    }
    async create(trackInputDto: TrackInputDto): Promise<TrackDetail> {
        return await this.trackDetailDao.create(trackInputDto);
    }
}

