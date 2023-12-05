const { response } = require('express');
const Project = require('../models/project.model');

class ProjectController {
    async create(req, res) {
        const { name, description, startDate, endDate, status, technical } = req.body;

        try {
            const project = await Project.findOne({ name });
            if (project) {
                return res.status(400).json({ success: false, message: 'Project already exists' });
            }

            const technicalIds = JSON.parse(technical);

            const newProject = new Project({
                name,
                description,
                startDate,
                endDate,
                status,
                technical: technicalIds
            });

            await newProject.save();

            res.json({ success: true, message: 'Project added successfully', project: newProject });
            console.log(newProject)
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async list(req, res) {
        try {
            const projects = await Project.find({}).populate('technical');
            res.json({ success: true, projects })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    details(req, res, next) {
        Project.find({ _id: req.params._id }).populate('technical')
            .then(project => res.json(project))
            .catch(err => next(err));
    }

    async update(req, res) {
        const { name, description, startDate, endDate, status, technical } = req.body;

        const project = await Project.find({ _id: req.params._id });
        
        const technicalIds = JSON.parse(technical);

        try {
            let updatedProject = {
                name: name || project.name,
                description: description || project.description,
                startDate: startDate || project.startDate,
                endDate: endDate || project.endDate,
                status: status || project.status,
                technical: technicalIds || project.technical,
            }
            const updateCondition = { _id: req.params._id }

            updatedProject = await Project.findByIdAndUpdate(updateCondition, updatedProject, { new: true })

            if (!updatedProject)
                return res.status(401).json({ success: false, message: 'Project not found' })

            res.json({ success: true, message: 'Project updated successfully', project: updatedProject })

        }
        catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async close(req, res) {
        try {
            const projectId = { _id: req.params._id }
            let closedProject = {
                isActive: false,
            }

            closedProject = await Project.findByIdAndUpdate(projectId, closedProject, { new: true })

            if (!closedProject)
                return res.status(401).json({ success: false, message: 'Project not found' })

            res.json({ success: true, message: 'Project closed successfully' })
        } catch (error) {
            console.log(error)
            res.status(404).json({ success: false, message: 'Internal Server Error' })
        }
    }
}

module.exports = new ProjectController;