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

}

export default UserService;