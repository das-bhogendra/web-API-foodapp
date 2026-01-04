import { Router, Request, Response } from 'express';
import { UserController } from '../../controllers/user.controller';
import { authorizedMiddleware } from '../../middlewares/authorization.middleware';

const router: Router = Router();

const userController = new UserController();


router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);


router.post('/', userController.createUser);


router.put('/:id', userController.updateUser);

// DELETE user
router.delete('/:id', userController.deleteUser);

export default router;
