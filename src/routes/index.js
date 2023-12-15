const authRouter = require('./auth.route');
const techRoute = require('./technical.route');
const roleRoute = require('./role.route');
const employeeRoute = require('./employee.route');
const projectRoute = require('./project.route');
const recordRoute = require('./record.route');
const empInProRoute = require('./employeeInProjects.route');

function route(app) {

app.use('/auth', authRouter);
app.use('/technicals', techRoute);
app.use('/roles', roleRoute);
app.use('/employees', employeeRoute);
app.use('/projects', projectRoute);
app.use('/empinpro', empInProRoute);
app.use('/records', recordRoute);

}

module.exports = route;