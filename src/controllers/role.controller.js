const Role = require('../models/role.model');

class RoleController {
    list(res, next) {
        Role.find({})
        .then(roles => res.json({success: true, roles}))
        .catch(err => next(err));
    }

    create(req, res) {
        const role = new Role(req.body);
        role.save()
        .then(role => {
            console.log('req.body:',req.body);
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

            updatedRole = await Role.findOneAndUpdate(updateCondition, updatedRole, {new: true})

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
            const deleteCondition = {_id: req.params.id}
            const deletedRole = await Role.findOneAndDelete(deleteCondition)

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