const authRouter = require('./auth.route');
const employeeRoute = require('./employee.route');
const techRoute = require('./technical.route');
const roleRoute = require('./role.route');

function route(app) {

app.use('/auth', authRouter);
app.use('/employees', employeeRoute);
app.use('/technical', techRoute);
app.use('/role', roleRoute);

}

module.exports = route;