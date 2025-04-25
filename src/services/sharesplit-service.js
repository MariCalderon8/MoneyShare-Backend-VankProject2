class ShareSplitService {

    constructor(shareSplitRepository, notificationService) {
        this.shareSplitRepository = shareSplitRepository;
        this.notificationService = notificationService;
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

    async countShareMembers(shareId) {
        return await this.shareSplitRepository.countShareMembers(shareId);
    }
    async findSplitsByUser(userId){
        return await this.shareSplitRepository.findSplitsByUser(userId);
    }

    /**
     * Crea un split para un usuario en un share (Cuando se añade un miembro o se crea un share)
     * @param {string} idUser - El id del usuario
     * @param {Object} share - El share
     * @param {boolean} splitEqually - Si se debe dividir el monto igualmente
     */
    async createSplit(idUser, share, splitEqually) {
        let split = await this.findSplitByUserShare(share.id_share, idUser);
        if(split) {
            throw new Error('El usuario ya está registrado en el share');
        }
        await this.shareSplitRepository.createSplit(idUser, share.id_share);
        if(splitEqually){
            await this.splitEqually(share);
        }
    }

    async deleteSplit(splitId) {
        return await this.shareSplitRepository.deleteSplit(splitId);
    }

    async updateSplit(splitData, userId, shareId) {
        return await this.shareSplitRepository.updateSplit(splitData, userId, shareId);
    }

    /**
     * Actualiza los splits luego de crear un gasto
     * @param {Object} share - El share
     * @param {string} userId - El id del usuario
     * @param {number} amount - El monto del gasto
     */
    async updateSplitsAfterExpense(share, userId, amount) {
        const splits = await this.findSplitsByShare(share.id_share);
        if (splits.length === 0) {
            throw new Error("No hay splits para actualizar balances");
        }
        splits.forEach(split => {
            this.notificationService.createNewExpenseNotification(split.id_user, userId, share.name, amount);
        });

        // Encuentra el split del usuario que hizo el gasto
        const userSplit = splits.find(split => {
            return split.id_user === userId}
        );

        // Actualiza el paid del usuario que hizo el gasto
        if (userSplit) {
            const newPaid = parseFloat(userSplit.paid) + parseFloat(amount);
            await this.updateSplit({
                paid: newPaid
            }, userId, share.id_share);
        }
        
        await this.updateSplitData(share);
        
    }

    /**
     * Actualiza los splits luego de algun cambio y de acuerdo a los porcentajes establecidos para cada usuario
     * @param {Object} share - El share
     */
    async updateSplitData(share){
        const splits = await this.findSplitsByShare(share.id_share);
        if (splits.length === 0) {
            throw new Error("No hay splits para dividir el monto.");
        }

        for (const split of splits) {
            
            let assignedAmount = (share.paid_amount * parseFloat(split.percentage)) / 100;
            let balance = split.paid - assignedAmount;
            let splitData = {
                percentage: split.percentage,
                assigned_amount: assignedAmount,
                balance: balance
            }
            await this.updateSplit(splitData, split.id_user, share.id_share)
        }
    }

    /**
     * Actualiza los porcentajes de los usuarios de un share
     * @param {Object} share - El share
     * @param {Object} percentages - Los porcentajes establecidos para cada usuario
     */
    async modifyPercentage(share, percentages) {
        if (this.validatePercentages(percentages)) {
            for (const data of percentages) {
                let split = await this.findSplitByUserShare(share.id_share, data.id_user);
                let paidAmount = split.paid;
                let assignedAmount = (share.paid_amount * data.percentage) / 100;
                let balance = paidAmount - assignedAmount;
                
                let splitData = {
                    percentage: data.percentage,
                    assigned_amount: assignedAmount,
                    balance: balance
                }
                await this.updateSplit(splitData, data.id_user, share.id_share)
            }
        }
    }

    /**
     * Valida que los porcentajes de los usuarios de un share sumen 100
     * @param {Object} percentages - Los porcentajes establecidos para cada usuario
     */
    validatePercentages(percentages) {
        const totalPercentage = percentages
            .map(v => Math.round(v.percentage * 10000)) // Convertir a enteros en centésimas
            .reduce((sum, value) => sum + value, 0);

        if (totalPercentage !== 1000000) {
            throw new Error("Los porcentajes deben sumar 100");
        }

        return true;
    }

    /**
     * Divide el monto del share entre los usuarios de un share (Cuando se añade un miembro o se crea un share)
     * @param {Object} share - El share
     */
    async splitEqually(share) {
        const splits = await this.findSplitsByShare(share.id_share);

        if (splits.length === 0) {
            throw new Error("No hay splits para dividir el monto.");
        }

        const percentage = 100 / splits.length;
        for (const split of splits) {
            
            let assignedAmount = (share.paid_amount * percentage) / 100;
            let balance = split.paid - assignedAmount;
            let splitData = {
                percentage: percentage,
                assigned_amount: assignedAmount,
                balance: balance
            }
            await this.updateSplit(splitData, split.id_user, share.id_share)
        }
    }
}

export default ShareSplitService;