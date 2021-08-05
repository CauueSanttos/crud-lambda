import { Router } from 'express';

import UserService from '../services/UserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const users = await UserService.listUsers();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, age } = request.body;

  const user = await UserService.createUser({ name, email, age });

  return response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, age } = request.body;

  const user = await UserService.updateUser({ id, name, email, age });

  return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await UserService.deleteUser({ id });

  return response.status(200).json({ message: 'success' });
});

export default usersRouter;