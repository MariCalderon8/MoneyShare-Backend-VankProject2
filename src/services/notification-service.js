class NotificationService {
    constructor(notificationRepository, userService) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
    }

    async findNotificationById(id) {
        return await this.notificationRepository.findNotificationById(id);
    }

    async findNotificationsByUser(userEmail) {
        const idUser = await this.userService.getIdByEmail(userEmail);
        return await this.notificationRepository.findNotificationsByUser(idUser);
    }

    async createNotification(notification) {
        return await this.notificationRepository.createNotification(notification);
    }

    async deleteNotification(id) {
        return await this.notificationRepository.deleteNotification(id);
    }

    async deleteAllNotifications(userEmail) {
        const idUser = await this.userService.getIdByEmail(userEmail);
        return await this.notificationRepository.deleteAllNotifications(idUser);
    }

    async createWelcomeNotification(userEmail) {
        const idUser = await this.userService.getIdByEmail(userEmail);
        const notification = {
            id_user: idUser,
            message: "🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌",
            type: "general",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    async createMakePaymentNotification(idUser, shareName, userName, amount) {
        console.log("createMakePaymentNotification");
        console.log(idUser, shareName, userName, amount);
        const notification = {
            id_user: idUser,
            message: `✅ Pagaste $${amount} a ${userName} en el share "${shareName}" ¡Gracias por mantener todo al día! 📅`,
            type: "payment",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    async createReceivePaymentNotification(idUser, shareName, userName, amount) {
        const notification = {
            id_user: idUser,
            message: `💸 ${userName} te pagó $${amount} en el share "${shareName}" ¡Ya casi se completa el reparto! 🎯`,
            type: "payment",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    async createShareExpenseNotification(idUser, shareName) {
        const notification = {
            id_user: idUser,
            message: `🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en ${shareName}! 💸`,
            type: "general",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    async joinShareNotification(idUser, shareName) {
        const notification = {
            id_user: idUser,
            message: `🎉 ¡Te uniste al share "${shareName}"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸`,
            type: "general",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    async createNewExpenseNotification(idUser, idUserCreator, shareName, amount) {
        let message = '';
        if (idUser === idUserCreator) {
            message = `🎉 Añadiste un gasto de $${amount} en el share "${shareName}" \n ¡Listo para compartir entre todos! 🤝`;
        } else {
            const user = await this.userService.findById(idUserCreator);
            message = `🎉 ${user.username} añadió un gasto de $${amount} en el share "${shareName}" \n ¡No olvides pagar tu parte! 🎯`;
        }
        const notification = {
            id_user: idUser,
            message: message,
            type: "general",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    // TODO: Implementar esta notificación
    async completeShareNotification(idUser, shareName) {
        const notification = {
            id_user: idUser,
            message: `🎉 ¡El share "${shareName}" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯`,
            type: "general",
            date: new Date()
        }
        return await this.createNotification(notification);
    }

    // TODO: Implementar esta notificación
    async pendingPaymentNotification(idUser, shareName, userName, amount) {
        const notification = {
            id_user: idUser,
            message: `⏰ Recordatorio: Tienes un pago pendiente de $${amount} en el share "${shareName}". ¡No olvides liquidarlo! 💸`,
            type: "payment",
            date: new Date()
        }
        return await this.createNotification(notification);
    }
}

export default NotificationService;


