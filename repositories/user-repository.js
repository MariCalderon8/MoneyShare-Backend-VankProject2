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

    let message = "";
    try{
      const hashedPassword = await bcrypt.hash(info.password, 10);
      await User.create({
        id_user: info.id_user,
        name: info.name,
        email: info.email,
        username: info.username,
        password: hashedPassword,
        balance: info.balance
      });
      message = "Usuario creado"

    }catch(error){
      console.error(error);
      message = "Error al crear usuario"
    }
    return message;
  }

  async login(info) {
    try {
      const email = info.email;
      const password = info.password;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return {login: false};
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return {login: false};
      }

      const token = jwt.sign(
        { userEmail: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );
      return {login: true, token}

    } catch (error) {
      console.error(error);
    }
  }

}

export default UserRepository;