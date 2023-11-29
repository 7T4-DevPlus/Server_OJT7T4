const Technical = require('../models/technical.model');

class TechController {
    list(res, next) {
        Technical.find({})
        .then(techs => res.json({success: true, techs}))
        .catch(err => next(err));
    }

    create(req, res) {
        const technical = new Technical(req.body);
        technical.save()
        .then(tech => {
            console.log('req.body:',req.body);
            res.status(200).json('added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }

    async update (req,res) {
        const {name} = req.body;
        const technical = await Technical.find({_id: req.params._id});

        if(!name)
        return res.status(400).json({success: false, message:'please enter technical name'})

        try{
            let updatedTechnical = {
                name: name || technical.name
            }
            const updateCondition = {_id: req.params._id}

            updatedTechnical = await Technical.findOneAndUpdate(updateCondition, updatedTechnical, {new: true})

            if(!updatedTechnical)
            return res.status(401).json({success: false, message: 'Technical not found'})

            res.json({success: true, message: 'Technical updated successfully'})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params.id}
            const deletedTechnical = await Technical.findOneAndDelete(deleteCondition)

            if(!deletedTechnical)
            return res.status(401).json({success: false, message: 'Technical not found'})

            res.json({success: true, message: 'Technical deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }

}

module.exports = new TechController;