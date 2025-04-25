class NotificationController {

    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    findNotificationByID = async (req, res) => {
        try {
            const notification = await this.notificationService.findNotificationById(req.params.id);
            if (!notification) {
                return res.status(404).json({ message: "Notificación no encontrada" });
            }
            return res.status(200).json({data: notification});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    createWelcomeNotification = async (req, res) => {
        try {
            await this.notificationService.createWelcomeNotification(req.body.email);
            return res.status(200).json({ message: "Notificación creada correctamente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    findNotificationsByUser = async (req, res) => {
        try {
            const notifications = await this.notificationService.findNotificationsByUser(req.dataToken.userEmail);
            return res.status(200).json({data: notifications});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    deleteNotification = async (req, res) => {
        try {
            await this.notificationService.deleteNotification(req.params.id);
            return res.status(200).json({ message: "Notificación eliminada correctamente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    deleteAllNotifications = async (req, res) => {
        try {
            await this.notificationService.deleteAllNotifications(req.dataToken.userEmail);
            return res.status(200).json({ message: "Todas las notificaciones eliminadas correctamente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

export default NotificationController;
