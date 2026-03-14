import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { requestsService } from './requests.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

function getAll(req: Request, res: Response, next: NextFunction): void {
    requestsService.getAll()
    .then((d) => res.json(d))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    requestsService.getById(Number(req.params.id))
    .then((d) => res.json(d))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    // normalize items: allow single string/object or array
    const { items } = req.body as any;
    if (items !== undefined) {
        if (!Array.isArray(items)) {
            req.body.items = [items];
        }
    }

    requestsService.create(req.body)
    .then(() => res.json({ message: 'Request created' }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
    requestsService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'Request updated' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    requestsService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'Request deleted' }))
    .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const itemSchema = Joi.alternatives().try(
        Joi.object(),
        Joi.string()
    );

    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        type: Joi.string().required(),
        items: Joi.alternatives().try(Joi.array().items(itemSchema), itemSchema).required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const itemSchema = Joi.alternatives().try(
        Joi.object(),
        Joi.string()
    );

    const schema = Joi.object({
        type: Joi.string().empty(''),
        items: Joi.alternatives().try(Joi.array().items(itemSchema), itemSchema).optional(),
        status: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
