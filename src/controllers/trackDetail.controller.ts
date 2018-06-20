import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { TrackDetail } from "../models/trackDetail.model";
import { TrackDetailResource } from "../resources/trackDetail.resource";

export class TrackDetailController {
    private trackDetailResource: TrackDetailResource;
    constructor() {
        this.trackDetailResource = new TrackDetailResource();
    }

    async findByIdTrackDetail(req: Request, res: Response): Promise<any> {
        const trackDetail: TrackDetail = await this.trackDetailResource.findByIdTrack(req.params.idTrackDetail);
        trackDetail ? res.status(HttpStatusCode.OK).json(trackDetail) : res.status(HttpStatusCode.NOT_FOUND).end();
    }


}
