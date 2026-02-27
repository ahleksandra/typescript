import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import { Role } from '../_helpers/role';
import { validateRequest } from '../_middleware/validateRequest';
import { userService } from './user.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

function getAll(req: Request, res: Response, next: NextFunction): void {
    userService.getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    console.log(`GET /users/:id handler invoked with id=${req.params.id}`);
    userService.getById(Number(req.params.id))
    .then((user) => {
        console.log('getById: service returned =>', user);
        if (!user) return next('User not found');
        res.json(user);
    })
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    userService.create(req.body)
    .then(() => res.json({ message: 'User created' }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
    userService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'User updates' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    userService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'User deleted' }))
    .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
            role: Joi.string().valid(...Object.values(Role)).default(Role.User),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.object().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
            role: Joi.string().valid(...Object.values(Role)).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}