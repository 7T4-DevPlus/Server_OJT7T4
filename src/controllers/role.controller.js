const Role = require('../models/role.model');
const Record = require('../models/record.model');

class RoleController {
    async list(req, res) {
        try {
            const roles = await Role.find({});
            res.json({ success: true, roles })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    create(req, res) {
        const role = new Role(req.body);
        role.save()
        .then(role => {
            const newRecord = new Record({
                record: `create new role ${role.name}`
            });
            newRecord.save();
            res.status(200).json('added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }

    async update (req,res) {
        const {name} = req.body;
        const role = await Role.find({_id: req.params._id});

        if(!name)
        return res.status(400).json({success: false, message:'please enter role name'})

        try{
            let updatedRole = {
                name: name || role.name
            }
            const updateCondition = {_id: req.params._id}

            updatedRole = await Role.findOneAndUpdate(updateCondition, updatedRole, {new: true});

            const newRecord = new Record({
                record: `updated role ${name} to ${updatedRole.name}`
            });
            newRecord.save();

            if(!updatedRole)
            return res.status(401).json({success: false, message: 'Role not found'})

            res.json({success: true, message: 'Role updated successfully'})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params._id}
            const deletedRole = await Role.findOneAndDelete(deleteCondition);

            const newRecord = new Record({
                record: `deleted role ${deletedRole.name}`
            });
            newRecord.save();

            if(!deletedRole)
            return res.status(401).json({success: false, message: 'Role not found'})

            res.json({success: true, message: 'Role deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }

}

module.exports = new RoleController;