import { Op } from "sequelize";
import ShareMember from "../dto/ShareMemberDTO.js";

class ShareMemberRespository {

    async findMembersByShare (idShare) {
        return await ShareMember.findAll({
            where: {id_share: idShare}
        })
    }

    async findMembersWithDebt(idShare) {
        return await ShareMember.findAll({
            where: {
                id_share: idShare,
                balance: {
                    [Op.lt]: 0  // [Op.lt] es el operador Sequelize para "menor que"
                }
            }
        })
    }

    async findMembersWithOverload(idShare) {
        return await ShareMember.findAll({
            where: {
                id_share: idShare,
                balance: {
                    [Op.gt]: 0  
                }
            }
        })
    }
}

export default ShareMemberRespository;