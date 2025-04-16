class ShareController {

    constructor(shareService) {
        this.shareService = shareService;
    }

    findShareById = async (req, res) => {
        try {
            const data = await this.shareService.findShareById(req.params.id);
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: 'Error al buscar el Share', error: error.message });
        }
    };

    findShareByCode = async (req, res) => {
        try {
            const data = await this.shareService.findShareByCode(req.params.code);
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: 'Error al buscar el Share', error: error.message });
        }
    };

    createShare = async (req, res) => {
        try {
            const data = await this.shareService.createShare(req.body, req.dataToken.userEmail);
            return res.status(201).json({ message: 'Share creado exitosamente', data });
        } catch (error) {
            return res.status(400).json({ message: 'Error al crear Share', error: error.message });
        }
    };


    deleteShare = async (req, res) => {
        try {
            const data = await this.shareService.deleteShare(req.params.id);
            return res.status(200).json({ message: data });
        } catch (error) {
            return res.status(400).json({ message: 'Error al eliminar Share', error: error.message });
        }
    };

    updateShare = async (req, res) => {
        try {
            const updatedShare = await this.shareService.updateShare(req.body);
            return res.status(200).json({ data: updatedShare });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    addMember = async (req, res) => {
        try{
            const addMember = await this.shareService.addMember(req.body.code, req.body.id_user, req.body.split_equally);
            return res.status(200).json({ data: addMember });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    removeMember = async (req, res) => {
        try{
            const removeMember = await this.shareService.removeMember(req.body.id_share, req.body.id_user);
            return res.status(200).json({ data: removeMember });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    modifySplitsPercentages = async (req, res) => {
        try {
            const modifyPercentages = await this.shareService.modifySplitsPercentages(req.params.shareId, req.body);
            return res.status(200).json({ data: modifyPercentages });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    splitPercentagesEqually = async (req, res) => {
        try {
            const percentages = await this.shareService.splitPercentagesEqually(req.params.shareId);
            return res.status(200).json({ data: percentages });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

}

export default ShareController;