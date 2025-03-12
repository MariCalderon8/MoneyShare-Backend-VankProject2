class ShareSplitService {

    constructor(shareSplitRepository, shareService) {
        this.shareSplitRepository = shareSplitRepository;
        this.shareService = shareService;
    }

    async findSplitById(splitId) {
        return await this.shareSplitRepository.findSplitById(splitId);
    }

    async findSplitByUserShare(shareId, userId) {
        return await this.shareSplitRepository.findSplitByUserShare(shareId, userId);
    }

    async findSplitsByShare(shareId) {
        return await this.shareSplitRepository.findSplitsByShare(shareId);
    }

    async createSplit(splitData) {
        //TODO: split equally ???, un usuario sólo puede tener un split por share
        const share = await this.shareService.findShareById(splitData.id_share);
        let assignedAmount = share.amount * splitData.percentage / 100;
        splitData.assigned_amount = assignedAmount; //Falta implementar
        return await this.shareSplitRepository.createSplit(splitData.id_user, splitData.id_share);
    }

    async deleteSplit(splitId) {
        return await this.shareSplitRepository.deleteSplit(splitId);
        //TODO: Split equally call
    }

    async updateSplit(splitData, userId, shareId) {
        return await this.shareSplitRepository.updateSplit(splitData, userId, shareId);
    }

    async modifyPercentage(shareId, percentages) {
        if (this.validatePercentages(percentages)) {
            const share = await this.shareService.findShareById(shareId);
            console.log(percentages);
            for (const data of percentages) {
                let paidAmount = await this.findSplitByUserShare(data.id_user, shareId).paid;
                let assignedAmount = (share.amount * data.percentage) / 100;
                let balance = paidAmount - assignedAmount;

                let splitData = {
                    percentage: data.percentage,
                    assigned_amount: assignedAmount,
                    balance: balance
                }
                await this.updateSplit(splitData, data.id_user, shareId)
            }
        }
    }

    validatePercentages(percentages) {
        const totalPercentage = percentages
            .map(v => Math.round(v.percentage * 10000)) // Convertir a enteros en centésimas
            .reduce((sum, value) => sum + value, 0);

        if (totalPercentage !== 1000000) {
            throw new Error("Los porcentajes deben sumar 100");
        }

        return true;
    }

    //Se llama al añadir un miembro, eliminar un split o cuando se desee
    async splitEqually(shareId) {
        const splits = await this.findSplitsByShare(shareId);
        const share = await this.shareService.findShareById(shareId);

        if (splits.length === 0) {
            throw new Error("No hay splits para dividir el monto.");
        }

        const percentage = 100 / splits.length;
        for (const split of splits) {
            let assignedAmount = (share.amount * percentage) / 100;
            let balance = split.paid - assignedAmount;

            let splitData = {
                percentage: percentage,
                assigned_amount: assignedAmount,
                balance: balance
            }
            await this.updateSplit(splitData, split.id_user, shareId)
        }
    }
}

export default ShareSplitService;