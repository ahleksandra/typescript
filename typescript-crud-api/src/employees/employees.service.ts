import { db } from '../_helpers/db';

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Employee.findAll();
}

async function getById(id: number) {
    return await getEmployee(id);
}

async function create(params: { employeeId: string; email: string; position?: string; hireDate?: string; departmentId?: number }) {
    const existing = await db.Employee.findOne({ where: { employeeId: params.employeeId } });
    if (existing) throw new Error('Employee ID already exists');
    await db.Employee.create({
        ...params,
        hireDate: params.hireDate ? new Date(params.hireDate) : undefined,
    });
}

async function update(id: number, params: Partial<{ employeeId: string; email: string; position?: string; hireDate?: string; departmentId?: number }>) {
    const emp = await getEmployee(id);
    if (params.hireDate) (params as any).hireDate = new Date(params.hireDate);
    await emp.update(params as any);
}

async function _delete(id: number) {
    const emp = await getEmployee(id);
    await emp.destroy();
}

async function getEmployee(id: number) {
    const emp = await db.Employee.findByPk(id);
    if (!emp) throw new Error('Employee not found');
    return emp;
}
