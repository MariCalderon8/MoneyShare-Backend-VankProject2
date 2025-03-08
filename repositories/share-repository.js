import Share from '../dto/ShareDTO.js';

class ShareRepository {

    async findShareById(id) {
        const share = await Share.findOne({
            where: { id_share: id }
        })
        return share;
    }

    async createShare(shareData) {
        let message = "";
        try {
            await Share.create({
                name: shareData.name,
                description: shareData.description,
                amount: shareData.amount,
                due_date: shareData.due_date
            })
            message = "Share creado"

        } catch (error) {
            console.error(error);
            message = "Error al crear usuario"
        }
        return message;
    }

    async deleteShare (id) {
        const deletedRows = await Share.destroy({
            where: { id_share: id }
        });

        if (deletedRows > 0) {
            console.log("Usuario eliminado correctamente.");
        } else {
            console.log("No se encontró el usuario para eliminar.");
        }
    }

    async updateShare (newData) {
        const [updatedRows] = await Share.update(newData, {
            where: { id_share: newData.id_share }
        });
    
        if (updatedRows > 0) {
            console.log("Share actualizado correctamente.");
        } else {
            console.log("No se encontró el Share para actualizar.");
        }
    }
}

export default ShareRepository;