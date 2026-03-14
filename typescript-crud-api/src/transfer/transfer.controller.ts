import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { transferService } from './transfer.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

function getAll(req: Request, res: Response, next: NextFunction): void {
    transferService.getAll()
    .then((d) => res.json(d))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    transferService.getById(Number(req.params.id))
    .then((d) => res.json(d))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    transferService.create(req.body)
    .then(() => res.json({ message: 'Transfer created' }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
    transferService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'Transfer updated' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    transferService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'Transfer deleted' }))
    .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        employeeId: Joi.number().integer().required(),
        fromDepartmentId: Joi.number().integer().optional(),
        toDepartmentId: Joi.number().integer().optional(),
        transferDate: Joi.date().iso().optional(),
        reason: Joi.string().allow('', null),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        fromDepartmentId: Joi.number().integer().optional(),
        toDepartmentId: Joi.number().integer().optional(),
        transferDate: Joi.date().iso().optional(),
        reason: Joi.string().allow('', null),
        status: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}
