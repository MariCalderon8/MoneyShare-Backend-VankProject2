class ShareSplitService {

    constructor(shareSplitRepository) {
        this.shareSplitRepository = shareSplitRepository;
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

    async updateSplitsAfterExpense(share, userId, amount) {
        const splits = await this.findSplitsByShare(share.id_share);
        if (splits.length === 0) {
            throw new Error("No hay splits para actualizar balances");
        }
        
        // Actualizar el paid del usuario que hizo el gasto
        const userSplit = splits.find(split => {
            console.log(split.id_user);
            return split.id_user === userId}
        );

        if (userSplit) {
            const newPaid = parseFloat(userSplit.paid) + parseFloat(amount);
            await this.updateSplit({
                paid: newPaid
            }, userId, share.id_share);
        }
        
        if(share.split_equally) {
            console.log('dividir gasto igual');
            await this.splitEqually(share);
        } else {
            console.log('dividir diferente');
            await this.updateSplitData(share);
        }
    }

    async updateSplitData(share){
        const splits = await this.findSplitsByShare(share.id_share);

        if (splits.length === 0) {
            throw new Error("No hay splits para dividir el monto.");
        }

        for (const split of splits) {
            
            let assignedAmount = (share.paid_amount * split.percentage) / 100;
            let balance = split.paid - assignedAmount;
            let splitData = {
                percentage: percentage,
                assigned_amount: assignedAmount,
                balance: balance
            }
            await this.updateSplit(splitData, split.id_user, share.id_share)
        }
    }

    async modifyPercentage(share, percentages) {
        if (this.validatePercentages(percentages)) {
            console.log(percentages);
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

    validatePercentages(percentages) {
        const totalPercentage = percentages
            .map(v => Math.round(v.percentage * 10000)) // Convertir a enteros en centésimas
            .reduce((sum, value) => sum + value, 0);

        if (totalPercentage !== 1000000) {
            throw new Error("Los porcentajes deben sumar 100");
        }

        return true;
    }

    //Se llama al añadir un miembro, eliminar un split o al añadir un gasto 
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