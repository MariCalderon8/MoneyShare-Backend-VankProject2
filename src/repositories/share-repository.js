import Share from '../dto/ShareDTO.js';
import  { sequelize } from '../database/sequelize.js';


class ShareRepository {

    async findShareById(id) {
        return await Share.findOne({ where: { id_share: id } });
    }

    async findShareByCode(code) {
        return await Share.findOne({ 
            where: { code: code }
        });
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

    //TODO: Modelo Share_member
    async addMember(share, userId){
        console.log(userId);
        const ShareMember = sequelize.models.share_member;
        return await ShareMember.create({
            id_share: share.id_share,
            id_user: userId
        });    
    }
    
}

export default ShareRepository;