class ShareService {

    constructor(shareRepository) {
        this.shareRepository = shareRepository;
    }

    async findShareById(id) {
        return await this.shareRepository.findShareById(id);
    }

    async createShare(shareData) {
        return await this.shareRepository.createShare(shareData);
    }

    async deleteShare(id) {
        return await this.shareRepository.deleteShare(id);
    }

    async updateShare(newData) {
        return await this.shareRepository.updateShare(newData);
    }
}

export default ShareService;