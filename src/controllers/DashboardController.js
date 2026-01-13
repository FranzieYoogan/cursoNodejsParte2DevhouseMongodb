const House = require('../models/House');

class DashboardController {

async show(req, res) {

    const {user_id} = req.headers;
    const houses = await House.find({user: user_id});
    return res.status(200).json(houses);

}

}

module.exports = new DashboardController();