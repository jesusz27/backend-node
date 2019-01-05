import path from "path";
export class UserService {
    constructor() {
    }
    async uploadAvatar(req: any): Promise<string> {
        const file = req.files.avatar,
            name = file.name,
            type = file.mimetype;
        const uploadpath = path.join("dist", "uploads", name);
        let uploaded = "uploads/" + name;
        file.mv(uploadpath, function (err: any) {
            if (err) {
                uploaded = undefined;
            }
        });
        return uploaded;
    }
}