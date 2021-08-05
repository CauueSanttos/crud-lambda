import { getRepository } from 'typeorm';
import { Database } from '../database';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id?: string,
  name?: string;
  email?: string;
  age?: number;
}

class UserService {
  private database = new Database();

  private async getConnection() {
    return await this.database.getConnection();
  }

  public async listUsers(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return users;
  }

  public async createUser({ name, email, age }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = usersRepository.create({
      name,
      email,
      age,
    });

    await usersRepository.save(user);

    return user;
  }

  public async updateUser({ id, name, email, age }: Request): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    try {
      await usersRepository.findOne({ 
        where: { id }
      });
    } catch (error) {
      throw new AppError('User not found.');
    }

    await usersRepository.save({
      id,
      name,
      email,
      age,
    });

    const newUser = await usersRepository.findOne({ 
      where: { id }
    });

    return newUser;
  }

  public async deleteUser({ id }: Request) {
    let user;
    const usersRepository = getRepository(User);

    try {
      user = await usersRepository.findOne({ 
        where: { id }
      });

      if (user) {
        await usersRepository.remove(user);
      }
    } catch (error) {
      throw new AppError('User not found.');
    }
  }
}

export default new UserService();
