import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/errorHandler';
import { initialize } from './_helpers/db';
import userscontroller from './users/users.controller';
import departmentsController from './departments/departments.controller';
import employeesController from './employees/employees.controller';
import requestsController from './requests/requests.controller';
import transferController from './transfer/transfer.controller';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// simple request logger for debugging
app.use((req, res, next) => {
    console.log(`HTTP ${req.method} ${req.originalUrl}`);
    next();
});

// quick health check
app.get('/__ping', (_req, res) => res.json({ pong: true }));

// mount user routes
app.use('/users', userscontroller);
app.use('/departments', departmentsController);
app.use('/employees', employeesController);
app.use('/requests', requestsController);
app.use('/transfer', transferController);

// global error handler (must come after route registration)
app.use(errorHandler);


const PORT = process.env.PORT || 4000;

initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Test with: POST /users with { email, password, ...}`);
    });
})
.catch((err) => {
    console.error('Failed to initialized database:', err);
    process.exit(1);
});