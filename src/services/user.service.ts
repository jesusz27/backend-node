export class UserService {
    constructor() {
    }
    async findByCodUser(req: any): Promise<boolean> {
        const file = req.files.avatar,
            name = file.name,
            type = file.mimetype;
        const uploadpath = "dist/uploads/" + name;
        let uploaded = true;
        console.log("ruta" + uploadpath);
        file.mv(uploadpath, function (err: any) {
            if (err) {
                uploaded = false;
            }
        });
        return uploaded;
    }
}