class ShareService {

    constructor(shareRepository, shareSplitService, userService, shareMemberService) {
        this.shareRepository = shareRepository;
        this.shareSplitService = shareSplitService;
        this.userService = userService;
        this.shareMemberService = shareMemberService;
    }

    async findShareById(id) {
        return await this.shareRepository.findShareById(id);
    }

    async findShareByCode(code) {
        return await this.shareRepository.findShareByCode(code);
    }

    async createShare(shareData, userEmail) {
        shareData.id_creator = await this.userService.getIdByEmail(userEmail);

        let code;
        do {
            code = await this.createCode();
        } while (!(await this.validateCode(code))); // Espera la validación correcta
        
        shareData.code = code;
        
        let createShare = await this.shareRepository.createShare(shareData);
        await this.addMember(code, shareData.id_creator, true);

        return createShare;
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
        let share = await this.findShareById(shareId);
        if(share.id_creator == userId) {
            throw new Error('No se puede eliminar al creador del share');
        }
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

    async findMembersByShare(idShare) {
        return await this.shareMemberService.findMembersByShare(idShare);
    }

    async findMembersWithDebt(idShare) {
        return await this.shareMemberService.findMembersWithDebt(idShare);
    }

    async findMembersWithOverload(idShare) {
        return await this.shareMemberService.findMembersWithOverload(idShare);
    }

}

export default ShareService;