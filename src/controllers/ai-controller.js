class AIController {
    constructor(aiService) {
        this.aiService = aiService;
    }

    sendMessage = async (req, res) => {
        try {
            const message = req.body.message;
            const response = await this.aiService.sendMessage(message);
            res.status(200).json({ message: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    deleteHistory = async (req, res) => {
        try {
            await this.aiService.deleteHistory();
            res.status(200).json({ message: "Historial borrado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default AIController;
