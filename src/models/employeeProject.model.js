const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employee.model');
const Project = require('./project.model');
const Role = require('./role.model');

const EmployeeInProject = new Schema({
    description: String,
    joinDate: Date,
    outDate: Date,
    isWorking: {
        type: Boolean,
        default: true
    },
    role: {
        type: Schema.Types.ObjectId, 
        ref: Role
    },
    employeeId: {
        type: Schema.Types.ObjectId, 
        ref: Employee
    },
    projectId: {
        type: Schema.Types.ObjectId, 
        ref: Project
    },
})

module.exports = mongoose.model('EmpPro', EmployeeInProject);