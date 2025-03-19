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
        
        let createShare = await this.shareRepository.createShare(shareData);
        await this.addMember(code, shareData.id_creator, true);
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
        let share = await this.findShareByCode(code);
        return !share;
    }

    async deleteShare(id) {
        return await this.shareRepository.deleteShare(id);
    }

    async updateShare(newData) {
        return await this.shareRepository.updateShare(newData);
    }

    async addMember(code, userId, splitEqually){
        let share = await this.findShareByCode(code);
        if(!share) {
            throw new Error('Share no encontrado');
        }
        await this.shareSplitService.createSplit(userId, share, splitEqually);
    }

    async findSplitByShareUser(shareId, userId) {
        return await this.shareSplitService.findSplitByUserShare(shareId, userId);
    }

    async removeMember(shareId, userId) {
        let split = await this.findSplitByShareUser(shareId, userId);
        let removeMember = this.shareSplitService.deleteSplit(split);
        this.splitPercentagesEqually(shareId);
    }

    async modifySplitsPercentages(shareId, percentages){
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.modifyPercentage(share, percentages);
    }

    async splitPercentagesEqually(shareId) {
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.splitEqually(share);
    }

}

export default ShareService;