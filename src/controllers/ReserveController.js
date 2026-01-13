const Reserve = require('../models/Reserve');
const House = require('../models/House');
const User = require('../models/User');

class ReserveController {

    async index(req,res) {

        const {user_id} = req.headers;
        const reserves = await Reserve.find({user:user_id}).populate('house'); 
        return res.status(200).json(reserves);

    }

    async store(req,res) {

        const {user_id} = req.headers;
        const {house_id} = req.params;
        const {date} = req.body;

        const house = await House.findById(house_id);

        if(!house) {

            return res.status(401).json({error: "House not found"});

        }

        if(house.status !== true) {

            return res.status(401).json({error: "House not available"});

        }

        const user = User.findById(user_id);

        if(String(user._id) === String(house.user)) {

            return res.status(401).json({error: "User not authorized"});

        }

        const reserve = await Reserve.create({

            user: user_id,
            house: house_id,
            date

        })

        await (await reserve.populate('house').populate('user').execPopulate());

        return res.status(201).json({message: "Reserve created", reserve});

    }

    async destroy(req,res) {

        const {reserve_id} = req.params;
        const reserve = await Reserve.findByIdAndDelete(reserve_id);

        if(!reserve) {

            return res.status(401).json({error: "Reserve not found"});

        }

        return res.status(200).json({message: "Reserve canceled"});

    }

}

module.exports = new ReserveController();