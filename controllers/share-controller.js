class ShareController {
    
    constructor(shareService) {
        this.shareService = shareService;
    }

    findShareById = async (req, res) => {
        let id = req.params.id;
        return res.status(200).json({
            data: await this.shareService.findShareById(id)
        });
    }

    createShare = async (req, res) => {
        return res.status(200).json({
            data: await this.shareService.createShare(req.body)
        });
    }

    deleteShare = async (req, res) => {
        let id = req.params.id;
        return res.status(200).json({
            data: await this.shareService.deleteShare(id)
        });
    }

    updateShare = async (req, res) => {
        return res.status(200).json({
            data: await this.shareService.updateShare(req.body)
        })
    }
}

export default ShareController;