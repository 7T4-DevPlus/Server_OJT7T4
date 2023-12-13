const { response } = require('express');
const EmployeeProject = require('../models/employeeProject.model');
const Employee = require('../models/employee.model');
const Project = require('../models/project.model');
const Role = require('../models/role.model');
const Record = require('../models/record.model');

class EmployeeProjectController {
    async getEmployeeHistory(req, res) {
        const employeeId = req.params._id;
        try {
            const histories = await EmployeeProject.find({employeeId: employeeId}).populate('role').populate('projectId').populate('employeeId')
            res.json({ success: true, histories })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async getEmployeeInProject(req, res) {
        const projectId = req.params._id;
        try {
            const employees = await EmployeeProject.find({projectId: projectId, isWorking: true}).populate('role').populate('employeeId').populate('projectId');
            res.json({ success: true, employees })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async addEmployee(req, res) {
        const {description, joinDate, outDate, role, employeeId, projectId} = req.body;
        console.log(req.body);
        try {
            const checkEmployee = await Employee.findOne({_id: employeeId});
            if(checkEmployee.isAvailable === false){
                return  res.status(500).json({ success: false, message: 'Employee is not avaiable!' });
            }
            const project = await Project.findOne({_id: projectId});
            const position = await Role.findOne({_id: role});
            
            const newEmployeeInProject = new EmployeeProject({
                description,
                joinDate,
                outDate,
                role,
                employeeId,
                projectId,
            });
            await newEmployeeInProject.save();

            const newRecord = new Record({
                record: `added employee ${checkEmployee.name} to project ${project.name} with position ${position.name}`,
                type: "update",
                object: "project"
            });
            newRecord.save();

            let updatedEmployee = {
                isAvailable: false,
            }
            updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });

            const employees = await EmployeeProject.find({projectId: projectId, isWorking: true}).populate('role').populate('employeeId').populate('projectId');

            res.json({ success: true, message: 'Employee added successfully', employees: employees });
            console.log(newEmployeeInProject)
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error - Employee added failed' })
        }
    }

    async removeEmployee(req, res) {
        try {
            let removedEmployee = {
                isWorking: false,
                outDate: Date.now(),
            }
            removedEmployee = await EmployeeProject.findByIdAndUpdate(req.params._id, removedEmployee, { new: true });

            const employeeProject = await EmployeeProject.findOne({_id: req.params._id}).populate('employeeId').populate('projectId');
            const employeeId = employeeProject.employeeId;

            let updatedEmployee = {
                isAvailable: true,
            }
            updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });

            const newRecord = new Record({
                record: `removed employee ${updatedEmployee.name} form project ${employeeProject.projectId.name}`,
                type: "update",
                object: "project"
            });
            newRecord.save();

            if (!removedEmployee)
                return res.status(401).json({ success: false, message: 'Employee not found' })

            res.json({ success: true, message: 'Employee removed from project successfully' })
        } catch (error) {
            console.log(error)
            res.status(404).json({ success: false, message: 'Internal Server Error - Employee removed failed' })
        }
    }
}

module.exports = new EmployeeProjectController;