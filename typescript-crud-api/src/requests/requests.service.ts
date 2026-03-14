import { db } from '../_helpers/db';

export const requestsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Request.findAll();
}

async function getById(id: number) {
    return await getRequest(id);
}

async function create(params: { userId: number; type: string; items: any }) {
    await db.Request.create({ ...params, status: 'pending' });
}

async function update(id: number, params: Partial<{ type: string; items: any; status: string }>) {
    const r = await getRequest(id);
    await r.update(params as any);
}

async function _delete(id: number) {
    const r = await getRequest(id);
    await r.destroy();
}

async function getRequest(id: number) {
    const r = await db.Request.findByPk(id);
    if (!r) throw new Error('Request not found');
    return r;
}
