class ShareService {

    constructor(shareRepository, shareSplitService, userService, shareMemberService, notificationService) {
        this.shareRepository = shareRepository;
        this.shareSplitService = shareSplitService;
        this.userService = userService;
        this.shareMemberService = shareMemberService;
        this.notificationService = notificationService;
    }

    async findShareById(id) {
        return await this.shareRepository.findShareById(id);
    }

    async findShareByCode(code) {
        return await this.shareRepository.findShareByCode(code);
    }

    /**
     * Encuentra todos los shares de un usuario
     * @param {string} email - El email del usuario
     * @returns {Promise<Object>} - Los shares del usuario
     */
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

    /**
     * Crea un share, agrega un miembro y envía una notificación
     * @param {Object} shareData - Los datos del share a crear
     * @param {string} userEmail - El email del usuario que crea el share
     * @returns {Promise<Object>} - El share creado
     */
    async createShare(shareData, userEmail) {
        shareData.id_creator = await this.userService.getIdByEmail(userEmail);

        let code;
        do {
            code = await this.createCode();
        } while (!(await this.validateCode(code))); 

        shareData.code = code;

        let createShare = await this.shareRepository.createShare(shareData); // Crea el share
        await this.notificationService.createShareExpenseNotification(shareData.id_creator, shareData.name); // Envía una notificación
        await this.addMember(code, userEmail); // Agrega un miembro

        return createShare;
    }

    /**
     * Crea un código único para un share
     * @returns {string} - El código único
     */
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

    /**
     * Agrega un miembro a un share, envía una notificación y crea un split
     * @param {string} code - El código del share
     * @param {string} userEmail - El email del usuario que agrega un miembro
     * @returns {Promise<Object>} - El share creado
     */
    async addMember(code, userEmail) {
        let userId = await this.userService.getIdByEmail(userEmail);
        if(!userId) {
            throw new Error('Usuario no encontrado');
        }
        let share = await this.findShareByCode(code);
        if (!share) {
            throw new Error('Share no encontrado');
        }
        if (share.id_creator != userId) {
            await this.notificationService.joinShareNotification(userId, share.name);
        }
        await this.shareSplitService.createSplit(userId, share, share.split_equally);
        return share;
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

    /**
     * Actualiza los porcentajes de los splits de un share
     * @param {string} shareId - El id del share
     * @param {Object} percentages - Los porcentajes establecidos para cada usuario
     */
    async modifySplitsPercentages(shareId, percentages) {
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.modifyPercentage(share, percentages);
    }

    /**
     * Divide el monto del share entre los usuarios de un share (Cuando se añade un miembro o se crea un share)
     * @param {string} shareId - El id del share
     */
    async splitPercentagesEqually(shareId) {
        let share = await this.findShareById(shareId);
        return await this.shareSplitService.splitEqually(share);
    }

    /**
     * Actualiza el share y los splits luego de crear un gasto
     * @param {string} shareId - El id del share
     * @param {string} userId - El id del usuario
     * @param {number} amount - El monto del gasto
     */
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

    /**
     * Actualiza el share y los splits luego de actualizar o eliminar un gasto
     * @param {string} shareId - El id del share
     * @param {string} userId - El id del usuario
     * @param {number} amountDifference - La diferencia del monto del gasto
     */
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

    /**
     * Realiza un pago entre dos usuarios (Aplica sólo para expenses y debts)
     * @param {string} idShare - El id del share
     * @param {number} amountToPay - El monto a pagar
     * @param {string} payingUserId - El id del usuario que paga
     * @param {string} paidUserId - El id del usuario que recibe el pago
     */
    async makePayment(idShare, amountToPay, payingUserId, paidUserId) {
        await this.validateShareBeforePayment(idShare);
        await this.validateUsersBeforePayment(idShare, payingUserId, paidUserId);
        //const payingUserId = await this.userService.getIdByEmail(payingUserEmail);

        const splitPayingUser = await this.findSplitByShareUser(idShare, payingUserId);
        const splitPaidUser = await this.findSplitByShareUser(idShare, paidUserId);
        
        // El monto a pagar no exceda el balance del usuario que recibe el pago y que el usuario que paga no exceda su monto asignado
        if (parseFloat(amountToPay) > parseFloat(splitPaidUser.balance) || parseFloat(amountToPay) + parseFloat(splitPayingUser.paid) > parseFloat(splitPayingUser.assigned_amount)) {
            throw new Error(`El monto excede el total a pagar`);
        }

        // Actualiza el split del usuario que paga
        await this.shareSplitService.updateSplit({
            paid: parseFloat(amountToPay) + parseFloat(splitPayingUser.paid),
            balance: parseFloat(amountToPay) + parseFloat(splitPayingUser.balance)
        }, payingUserId, idShare);

        // Actualiza el split del usuario que recibe el pago
        await this.shareSplitService.updateSplit({
            paid: parseFloat(splitPaidUser.paid) - parseFloat(amountToPay),
            balance: parseFloat(splitPaidUser.balance) - parseFloat(amountToPay)
        }, paidUserId, idShare);

        // Envía notificaciones
        const share = await this.findShareById(idShare);
        if(!share) {
            throw new Error("Share no encontrado");
        }
        const payingUser = await this.userService.findById(payingUserId);
        const paidUser = await this.userService.findById(paidUserId);
        if(!payingUser || !paidUser) {
            throw new Error("Usuario no encontrado");
        }
        await this.notificationService.createMakePaymentNotification(payingUserId, share.name, paidUser.username, amountToPay);
        await this.notificationService.createReceivePaymentNotification(paidUserId, share.name, payingUser.username, amountToPay);
    }

    /**
     * Valida que el share sea de tipo share_expense o share_debt
     * @param {string} idShare - El id del share
     */
    async validateShareBeforePayment(idShare) {
        const share = await this.findShareById(idShare);
        if (!share) {
            throw new Error("Share no encontrado")
        }
        if (share.type != "share_expense" && share.type != "share_debt") {
            throw new Error("Share no válido")
        }
    }

    /**
     * Valida que los usuarios sean válidos y que pertenezcan al share
     * @param {string} shareId - El id del share
     * @param {string} payingUserId - El id del usuario que paga
     * @param {string} paidUserId - El id del usuario que recibe el pago
     */
    async validateUsersBeforePayment(shareId, payingUserId, paidUserId) {
        //const payingUserId = await this.userService.getIdByEmail(payingUserEmail);
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