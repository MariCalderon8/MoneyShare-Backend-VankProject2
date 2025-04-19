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

    async findSharesByUser(email) {
        let userId = await this.userService.getIdByEmail(email);
        if (!userId) {
            throw new Error("Email no válido");
        }
        const splits = await this.shareSplitService.findSplitsByUser(userId);
        const shares = [];

        for (const split of splits) {
            const share = await this.findShareById(split.id_share);
            if (share) {
                shares.push(share);
            }
        }
        return shares;
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

    async addMember(code, userId, splitEqually) {
        let share = await this.findShareByCode(code);
        if (!share) {
            throw new Error('Share no encontrado');
        }
        await this.shareSplitService.createSplit(userId, share, splitEqually);
    }

    async findSplitByShareUser(shareId, userId) {
        return await this.shareSplitService.findSplitByUserShare(shareId, userId);
    }

    async removeMember(shareId, userId) {
        let share = await this.findShareById(shareId);
        if (share.id_creator == userId) {
            throw new Error('No se puede eliminar al creador del share');
        }
        let split = await this.findSplitByShareUser(shareId, userId);
        let removeMember = this.shareSplitService.deleteSplit(split);
        this.splitPercentagesEqually(shareId);
    }

    async modifySplitsPercentages(shareId, percentages) {
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.modifyPercentage(share, percentages);
    }

    async splitPercentagesEqually(shareId) {
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.splitEqually(share);
    }

    async updateShareAfterExpense(shareId, userId, amount) {
        const share = await this.findShareById(shareId);
        if (!share) {
            throw new Error("Share no encontrado");
        }
        const newPaidAmount = parseFloat(share.paid_amount) + parseFloat(amount);
        const updatedShare = await this.updateShare({
            id_share: shareId,
            paid_amount: newPaidAmount
        });

        await this.shareSplitService.updateSplitsAfterExpense(updatedShare, userId, amount);
    }

    async updateShareAfterExpenseChange(shareId, userId, amountDifference) {
        const share = await this.findShareById(shareId);
        if (!share) {
            throw new Error("Share no encontrado");
        }

        const newPaidAmount = parseFloat(share.paid_amount) + parseFloat(amountDifference);
        const updatedShare = await this.updateShare({
            id_share: shareId,
            paid_amount: newPaidAmount
        });

        await this.shareSplitService.updateSplitsAfterExpense(updatedShare, userId, amountDifference);
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

    // Aplica sólo para expenses (gastos) y debts (deudas)
    async makePayment(idShare, amountToPay, payingUserEmail, paidUserId) {
        await this.validateShareBeforePayment(idShare);
        await this.validateUsersBeforePayment(idShare, payingUserEmail, paidUserId);
        const payingUserId = await this.userService.getIdByEmail(payingUserEmail);

        const splitPayingUser = await this.findSplitByShareUser(idShare, payingUserId);
        const splitPaidUser = await this.findSplitByShareUser(idShare, paidUserId);
        console.log(amountToPay);
        console.log(splitPayingUser.paid);
        console.log(splitPayingUser.assigned_amount);
        if (parseFloat(amountToPay) + parseFloat(splitPayingUser.paid) > parseFloat(splitPayingUser.assigned_amount) || amountToPay > splitPaidUser.balance) {
            throw new Error(`El monto excede el total a pagar`);
        }

        await this.shareSplitService.updateSplit({
            paid: parseFloat(amountToPay) + parseFloat(splitPayingUser.paid),
            balance: parseFloat(amountToPay) + parseFloat(splitPayingUser.balance)
        }, payingUserId, idShare);

        await this.shareSplitService.updateSplit({
            paid: parseFloat(splitPaidUser.paid) - parseFloat(amountToPay),
            balance: parseFloat(splitPaidUser.balance) - parseFloat(amountToPay)
        }, paidUserId, idShare);

    }

    async validateShareBeforePayment(idShare) {
        const share = await this.findShareById(idShare);
        if (!share) {
            throw new Error("Share no encontrado")
        }
        if (share.type != "share_expense" && share.type != "share_debt") {
            throw new Error("Share no válido")
        }
    }

    async validateUsersBeforePayment(shareId, payingUserEmail, paidUserId) {
        const payingUserId = await this.userService.getIdByEmail(payingUserEmail);
        const payingUser = await this.userService.findById(payingUserId);
        const paidUser = await this.userService.findById(paidUserId);
        if (!payingUser || !paidUser) {
            throw new Error("Uno de los usuarios no es válido");
        }

        const splitPayingUser = await this.findSplitByShareUser(shareId, payingUserId);
        const splitPaidUser = await this.findSplitByShareUser(shareId, paidUserId);
        if (!splitPayingUser || !splitPaidUser) {
            throw new Error("El usuario no pertenece al share");
        }

        if (splitPaidUser.balance <= 0) {
            throw new Error("No se le puede pagar a usuarios con balance neutro o negativo")
        }
    }

}

export default ShareService;