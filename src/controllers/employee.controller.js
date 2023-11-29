const { response } = require('express');
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Employee = require('../models/employee.model');
const Technical = require('../models/technical.model');

class EmployeeController {
    async create(req, res) {
        const {name, code, phone, email, identity, gender, technical} = req.body;
        console.log(req);
        // const image = await cloudinary.uploader.upload(req.file.path);
        const employee = await Employee.findOne({email});
        if (employee) {
            return res
				.status(400)
				.json({ success: false, message: 'Employee has already exits' })
        }
        try {
            const newEmployee = new Employee({
                name,
                code,
                phone,
                email,
                // image: image.secure_url,
                identity,
                gender,
                technical
            })
            await newEmployee.save()

            res.json({ success: true, message: 'Employee added successfully', employee: newEmployee})
        } catch (error) {
            // console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async list(req, res) {
        try {
            const employees = await Employee.find({});
            res.json({ success: true, employees })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    details(req, res, next) {
        Employee.find({_id: req.params._id})
        .then(employee => res.json(employee))
        .catch(err => next(err));
    }

    async update (req,res) {
        const {name, code, phone, email, identity, gender, isAvailable, isManager, isDelete, technical} = req.body;
        const image = await cloudinary.uploader.upload(req.file.path);
        const employee = await  Employee.find({_id: req.params._id});

        try{
            let updatedEmployee = {
                name: name || employee.name,
                code: code || employee.code,
                phone: phone || employee.phone,
                email: email || employee.email,
                image: image.secure_url || employee.image,
                identity: identity || employee.identity,
                gender: gender || employee.gender,
                isAvailable: isAvailable || employee.isAvailable,
                isManager: isManager || employee.isManager,
                isDelete: isDelete || employee.isDelete,
                technical: technical || employee.technical,
            }
            const updateCondition = {_id: req.params._id}

            updatedEmployee = await Employee.findByIdAndUpdate(updateCondition, updatedEmployee, {new: true})

            if(!updatedEmployee)
            return res.status(401).json({success: false, message: 'Employee not found'})

            res.json({success: true, message: 'Employee updated successfully'})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params._id}
            const deletedEmployee = await Employee.findOneAndDelete(deleteCondition)

            if(!deletedEmployee)
            return res.status(401).json({success: false, message: 'Employee not found'})

            res.json({success: true, message: 'Employee deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }
}

module.exports = new EmployeeController;