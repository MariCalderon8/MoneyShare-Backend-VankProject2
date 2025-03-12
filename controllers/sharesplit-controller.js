class ShareSplitController {

    constructor(shareSplitService) {
        this.shareSplitService = shareSplitService;
    }

    findSplitById = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.shareSplitService.findSplitById(req.params.id)
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    findSplitByUserShare = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.shareSplitService.findSplitByUserShare(req.params.shareId, req.params.userId)
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    findSplitsByShare = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.shareSplitService.findSplitsByShare(req.params.id)
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: error.message
            })
        }
    }

    // createSplit = async (req, res) => {
    //     try {
    //         return res.status(200).json({
    //             data: await this.shareSplitService.createSplit(req.body)
    //         })
    //     } catch (error) {
    //         console.error(error);

    //         return res.status(500).json({
    //             message: error.message
    //         })
    //     }
    // }

    deleteSplit = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.shareSplitService.deleteSplit(req.params.id)
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: error.message
            })
        }
    }

    // modifyPercentages = async (req, res) => {
    //     try {
    //         return res.status(200).json({
    //             data: await this.shareSplitService.modifyPercentage(req.params.shareId, req.body)
    //         })
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({
    //             message: error.message
    //         })
    //     }
    // }

    // splitEqually = async (req, res) => {
    //     try {
    //         return res.status(200).json({
    //             data: await this.shareSplitService.splitEqually(req.params.shareId)
    //         })
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({
    //             message: error.message
    //         })
    //     }
    // }
}

export default ShareSplitController;