import Share from '../dto/ShareDTO.js';

class ShareRepository {

    async findShareById(id) {
        return await Share.findOne({ where: { id_share: id } });
    }

    async createShare(shareData) {
        try {
            const share = await Share.create(shareData);
            return share;
        } catch (error) {
            throw new Error('Error al crear Share');
        }
    }

    async deleteShare(id) {
        const deletedRows = await Share.destroy({ where: { id_share: id } });
        if (deletedRows > 0) {
            return 'Share eliminado correctamente';
        } else {
            throw new Error('No se encontró el Share para eliminar');
        }
    }

    async updateShare(newData) {
        const [updatedRows] = await Share.update(newData, { 
            where: { id_share: newData.id_share } 
        });
        if (updatedRows > 0) {
            const updatedShare = await Share.findOne({ where: { 
                id_share: newData.id_share } 
            });
            return updatedShare;
        } else {
            throw new Error('No se encontró el Share para actualizar');
        }
    }
}

export default ShareRepository;