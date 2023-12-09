const { response } = require('express');
const EmployeeProject = require('../models/employeeProject.model');
const Employee = require('../models/employee.model');

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
            const employees = await EmployeeProject.find({projectId: projectId}).populate('role').populate('employeeId').populate('projectId');
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
            const newEmployeeInProject = new EmployeeProject({
                description,
                joinDate,
                outDate,
                role,
                employeeId,
                projectId,
            });
            await newEmployeeInProject.save();

            let updatedEmployee = {
                isAvailable: false,
            }
            updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });

            const employees = await EmployeeProject.find({projectId: projectId}).populate('role').populate('employeeId').populate('projectId');

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
                outDate: Date.now,
            }
            removedEmployee = await EmployeeProject.findByIdAndUpdate(req.params._id, removedEmployee, { new: true });

            let updatedEmployee = {
                isAvailable: true,
            }
            updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });

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