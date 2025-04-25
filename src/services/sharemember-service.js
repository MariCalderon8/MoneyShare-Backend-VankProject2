class ShareMemberService {

    constructor(shareMemberRepository) {
        this.shareMemberRepository = shareMemberRepository;
    }

    /**
     * Encuentra los miembros de un share
     * @param {string} idShare - El id del share
     * @returns {Promise<Object>} - Los miembros del share
     */
    async findMembersByShare(idShare) {
        const members = await this.shareMemberRepository.findMembersByShare(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }

    /**
     * Encuentra los miembros de un share con deuda
     * @param {string} idShare - El id del share
     * @returns {Promise<Object>} - Los miembros del share con deuda
     */
    async findMembersWithDebt(idShare) {
        const members = await this.shareMemberRepository.findMembersWithDebt(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }

    /**
     * Encuentra los miembros de un share con sobrecargo
     * @param {string} idShare - El id del share
     * @returns {Promise<Object>} - Los miembros del share con sobrecargo
     */
    async findMembersWithOverload(idShare) {
        const members = await this.shareMemberRepository.findMembersWithOverload(idShare);
        if(!members) {
            throw new Error("Share no encontrado");
        }
        return members;
    }
}

export default ShareMemberService;