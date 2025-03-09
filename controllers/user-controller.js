class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    register = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.register(req.body)
            });
        } catch (error) {
                return res.status(400).json({message: error.message});
        }
    }

    login = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.login(req.body)
            });
        } catch (error) {
            return res.status(400).json({message: 'Error en el inicio de sesión',error: error.message
            });
        }
    }

    profile = async (req, res) => {
        return res.status(200).json({
            data: `Tu email leído en tu token es: ${req.dataToken.userEmail}`
        });
    }
}


export default UserController;