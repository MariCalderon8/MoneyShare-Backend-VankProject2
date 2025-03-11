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
      tel: info.tel
    });

    if (!user) {
      throw new Error('Error al crear usuario');
    }
    return user;
  }


  async login(info) {
    try {
      const user = await User.findOne({ where: { email: info.email } });

      if (!user) {
        return { login: false };
      }

      const validPassword = await bcrypt.compare(info.password, user.password);
      if (!validPassword) {
        return { login: false };
      }

      const token = jwt.sign(
        { userEmail: info.email },
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