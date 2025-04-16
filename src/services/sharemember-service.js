class ShareMemberService {

    constructor(shareMemberRepository) {
        this.shareMemberRepository = shareMemberRepository;
    }

    async findMembersByShare(idShare) {
        const members = await this.shareMemberRepository.findMembersByShare(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }

    async findMembersWithDebt(idShare) {
        const members = await this.shareMemberRepository.findMembersWithDebt(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }

    async findMembersWithOverload(idShare) {
        const members = await this.shareMemberRepository.findMembersWithOverload(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }
}

export default ShareMemberService;