import EmailService from "./email-service.js";

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
  
}

export default UserService;