import { db } from '../_helpers/db';

export const transferService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Transfer.findAll();
}

async function getById(id: number) {
    return await getTransfer(id);
}

async function create(params: { employeeId: number; fromDepartmentId?: number; toDepartmentId?: number; transferDate?: string; reason?: string }) {
    await db.Transfer.create({
        ...params,
        transferDate: params.transferDate ? new Date(params.transferDate) : undefined,
        status: 'pending',
    });
}

async function update(id: number, params: Partial<{ fromDepartmentId?: number; toDepartmentId?: number; transferDate?: string; reason?: string; status?: string }>) {
    const t = await getTransfer(id);
    if (params.transferDate) (params as any).transferDate = new Date(params.transferDate);
    await t.update(params as any);
}

async function _delete(id: number) {
    const t = await getTransfer(id);
    await t.destroy();
}

async function getTransfer(id: number) {
    const t = await db.Transfer.findByPk(id);
    if (!t) throw new Error('Transfer not found');
    return t;
}
