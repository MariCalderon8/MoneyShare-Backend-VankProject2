import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../dto/UserDTO.js';
import { where } from 'sequelize';
dotenv.config();

class UserRepository {
  constructor() {
    this.collectionName = 'free_ai';
  }

  async getIdByEmail(email) {
    const user = await User.findOne({
      where: { email: email }
    });

    if(user) {
      return user.id_user;
    }
    return null;
  }

  async findAllUsers() {
    return await User.findAll();
  }

  async findUserById(id) {
    let user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  async delete(id) {
    const deleted = await User.destroy({ where: { id_user: id } });
    if (!deleted) {
      throw new Error('Error al eliminar usuario');
    }
    return deleted;
  }

  async updateUser(userId, data) {
    return await User.update(data, {
      where: { id_user: userId },
      returning: true
    })
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
        throw new Error("El correo no es válido");
      }

      const validPassword = await bcrypt.compare(info.password, user.password);
      if (!validPassword) {
        throw new Error("La contraseña no es válida");
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