const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employee.model');
const Project = require('./project.model');
const Role = require('./role.model');

const EmployeeInProject = new Schema({
    description: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date, 
        default: Date.now
    },
    outDate: Date,
    isWorking: {
        type: Boolean,
        default: true
    },
    role: {
        required: true,
        type: Schema.Types.ObjectId, 
        ref: Role
    },
    employeeId: {
        required: true,
        type: Schema.Types.ObjectId, 
        ref: Employee
    },
    projectId: {
        required: true,
        type: Schema.Types.ObjectId, 
        ref: Project
    },
})

module.exports = mongoose.model('EmpPro', EmployeeInProject);