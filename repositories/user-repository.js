import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../dto/UserDTO.js';
dotenv.config();

class UserRepository {
  constructor() {
    this.collectionName = 'free_ai';
  }

  async register(info) {
    const hashedPassword = await bcrypt.hash(info.password, 10);
    let user = await User.create({
      id_user: info.id_user,
      name: info.name,
      email: info.email,
      username: info.username,
      password: hashedPassword,
      balance: info.balance
    });

    if (!user) {
      throw new Error('Error al crear usuario');
    }
    return user;
  }


  async login(info) {
    try {
      const { email, password } = info;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { login: false };
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return { login: false };
      }

      const token = jwt.sign(
        { userEmail: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return { login: true, token };
    } catch (error) {
      console.error(error);
      throw new Error('Error en la autenticación');
    }
  }

}

export default UserRepository;