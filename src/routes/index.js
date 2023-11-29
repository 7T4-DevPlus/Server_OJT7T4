const authRouter = require('./auth.route');
const employeeRoute = require('./employee.route')

function route(app) {

app.use('/auth', authRouter);
app.use('/employees', employeeRoute);

}

module.exports = route;