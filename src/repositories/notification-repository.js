import Notification from "../dto/NotificationDTO.js";

class NotificationRepository {

    async findNotificationById(id) {
        return await Notification.findOne({ where: { id_notification: id } });
    }

    async findNotificationsByUser(id_user) {
        return await Notification.findAll({ where: { id_user: id_user } });
    }

    async createNotification(notification) {
        return await Notification.create(notification);
    }   

    async deleteNotification(id) {
        return await Notification.destroy({ where: { id_notification: id } });
    }

    async deleteAllNotifications(id_user) {
        return await Notification.destroy({ where: { id_user: id_user } });
    }

}

export default NotificationRepository;