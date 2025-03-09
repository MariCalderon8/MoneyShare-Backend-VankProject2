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

    createShare = async (req, res) => {
        try {
            const data = await this.shareService.createShare(req.body);
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
}

export default ShareController;