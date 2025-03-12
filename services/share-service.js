class ShareService {

    constructor(shareRepository) {
        this.shareRepository = shareRepository;
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
        return share.data == null;
    }

    async deleteShare(id) {
        return await this.shareRepository.deleteShare(id);
    }

    async updateShare(newData) {
        return await this.shareRepository.updateShare(newData);
    }
}

export default ShareService;