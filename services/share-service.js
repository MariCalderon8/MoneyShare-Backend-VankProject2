class ShareService {

    constructor(shareRepository, shareSplitService) {
        this.shareRepository = shareRepository;
        this.shareSplitService = shareSplitService;
    }

    async findShareById(id) {
        return await this.shareRepository.findShareById(id);
    }

    async findShareByCode(code) {
        return await this.shareRepository.findShareByCode(code);
    }

    async createShare(shareData) {
        let code;
        do {
            code = await this.createCode();
        } while (!(await this.validateCode(code))); // Espera la validación correcta
        
        shareData.code = code;
        return await this.shareRepository.createShare(shareData);
    }

    async createCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async validateCode(code) {
        let share = this.findShareByCode(code);
        // return share.data == null;
        return !share;
    }

    async deleteShare(id) {
        return await this.shareRepository.deleteShare(id);
    }

    async updateShare(newData) {
        return await this.shareRepository.updateShare(newData);
    }

    async addMemberAndSplit(shareId, userId) {
        const share = await this.shareRepository.findShareById(shareId);
        //Borrar este console
        console.log("Share encontrado:", share);

        if(!share){
            throw new Error("Share no encontrado");
        }

        // Verificar si ya existe en la tabla share_member
        const existingMember = await this.shareSplitRepository.findShareMember(shareId, userId);
        if (existingMember) {
            throw new Error("El usuario ya es miembro de este share");
        }

        await this.shareSplitRepository.createSplit(shareId, userId);
        await this.shareRepository.updateShare({ id_share: shareId, members: share.members });
        await this.shareSplitService.splitEqually(shareId);

        return share;
    }
}

export default ShareService;