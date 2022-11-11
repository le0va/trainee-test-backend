import express from 'express';

import { UsersControllers } from '../controllers/users-controllers';

export const router = express.Router();

router.get('/', UsersControllers.getUsers);

router.post('/', UsersControllers.createUser);

router.put('/:uid', UsersControllers.updateUser);

router.delete('/:uid', UsersControllers.deleteUser);
