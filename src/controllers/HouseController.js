const House = require('../models/House');
const User = require('../models/User');

class HouseController {

  async index(req,res) {

    const {status} = req.query;
    const houses = await House.find({status});
    return res.status(200).json(houses);

  }

  // para trabalhar com imagens usar a biblioteca multer
    async store(req,res) {

      const {filename} = req.file;
      const {description, price, location, status} = req.body;
      const {user_id} = req.headers;
      const house = await House.create({

        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status

      })

      return res.status(201).json({message: "House created", house});

    }

    async update(req,res) {

      const {filename} = req.file;
      const {house_id} = req.params;
      const {description, price, location, status} = req.body;
      const {user_id} = req.headers;

      const user = await User.findById(user_id);
      const houses = await House.findById(house_id);
      
      if(String(user._id) !== String(houses.user)) {

        return res.status(401).json({error: "House not authorized"});

      } else {

      await House.updateOne({_id: house_id}, {

        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status

      })

      return res.send();

    }

    }

    async destroy(req,res) {

      const {house_id} = req.params;
      const {user_id} = req.headers;

      const user = await User.findById(user_id);
      const houses = await House.findById(house_id);

      
      if(!user) {

        return res.status(401).json({error: "User not authorized"});

      }

      

      if(!houses) {

        return res.status(401).json({error: "House not found"});

      }

      if(String(houses.user) !== String(user._id)) {

        return res.status(401).json({error: "House deletion not authorized"});

      }
       

      await House.findByIdAndDelete({_id: house_id});

      return res.status(200).json({message: "House deleted"});

    }

}

module.exports = new HouseController();