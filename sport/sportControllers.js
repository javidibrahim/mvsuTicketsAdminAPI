const Sport = require('./sportModels');


exports.getAllSports = async(req, res) => {
    try {
        console.log('Fetching all sports');
        const sports = await Sport.getAll();
        res.status(200).json(sports);
    }catch (e) {
        res.status(500).json({message:'Error getting sports', error:e.message});
    }
};