class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    register = async (req, res) => {
        try {
            return res.status(201).json({
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

    findAllUsers = async (req, res) => {
        try{
            return res.status(200).json({
                data: await this.userService.findAllUsers()
            });
        }catch(error) {
            return res.status(500).json({message: "Error obteniendo los usuarios", error: error.message});
        }
    }

    findById = async (req, res) => {
        try{
            return res.status(200).json({
                data: await this.userService.findById(req.params.id)
            });
        }catch(error) {
            return res.status(404).json({message: "Error obteniendo los usuarios", error: error.message});
        }
    }

    delete = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.delete(req.params.email)
            });
        }catch(error) {
            return res.status(500).json({message: "Error eliminando al usuario", error: error.message});
        }
    }

    update = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.updateUser(req.params.idUser, req.body)
            });
        }catch(error) {
            console.error(error);
            return res.status(500).json({message: "Error actualizando al usuario", error: error.message});
        }
    }

    profile = async (req, res) => {
        return res.status(200).json({
            data: `Tu email leído en tu token es: ${req.dataToken.userEmail}`
        });
    }
}


export default UserController;