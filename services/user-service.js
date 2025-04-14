class UserService {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(info) {
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