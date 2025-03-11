import ShareSplit from '../dto/ShareSplitDTO.js';

class ShareSplitRepository {

    async findSplitById(splitId) {
        return await ShareSplit.findOne({
            where: { id_split: splitId }
        })
    }

    async findSplitsByShare(shareId) {
        return await ShareSplit.findAll({
            where: {id_share: shareId}
        })
    }

    async findSplitByUserShare(shareId, userId){
        return await ShareSplit.findAll({
            where: {
                id_share: shareId,
                id_user: userId
            }
        })
    }

    async createSplit(splitData) {
        const split = await ShareSplit.create(splitData);
        return split;
    }

    async deleteSplit(splitId) {
        return await ShareSplit.destroy({
            where: {
                id_split: splitId
            }
        })
    }

    async updateSplit(splitData, userId, shareId) {
        return await ShareSplit.update(splitData, {
            where: {
                id_share: shareId,
                id_user: userId
            }
        })
    }
}

export default ShareSplitRepository;