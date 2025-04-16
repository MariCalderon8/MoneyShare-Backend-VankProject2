import EmailService from "./email-service.js";
import bcrypt from 'bcrypt';
class UserService {

  constructor(userRepository) {
    this.userRepository = userRepository;
    this.emailService = new EmailService();
  }

  async register(info) {
    await this.emailService.sendWelcomeEmail(info.email, info.name)
    return await this.userRepository.register(info);
  }

  async login(info) {
    return await this.userRepository.login(info);
  }

  async getIdByEmail(email) {
    return await this.userRepository.getIdByEmail(email);

  }

  async findAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async findById(id) {
    return await this.userRepository.findUserById(id);
  }

  async delete(email) {
    let id = await this.getIdByEmail(email);
    return await this.userRepository.delete(id);
  }

  async updateUser(idUser, data) {
    let oldUser = await this.findById(idUser);

    if (data.id_user !== undefined && oldUser.id_user !== data.id_user) {
      throw new Error("El id no puede modificarse");
    }

    if (data.email !== undefined && oldUser.email !== data.email) {
      const idExistente = await this.userRepository.getIdByEmail(data.email); // Agregar await
      if (idExistente) {
        throw new Error("El nuevo correo ya existe"); // Corregir typo
      }
    }

    if (data.username !== undefined && oldUser.username !== data.username) {
      throw new Error("El username no puede modificarse");
    }

    if (data.password !== undefined && oldUser.password !== data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.updateUser(idUser, data);

  }
}
export default UserService;