const User = require ('../models/User');

//methods: index(listagem de sessoes), show(listar uma unica sessao), update, store, destroy
class SessionController {

    // await pois a requisição do banco de dados pode demorar entao se utiliza async await
    async store(req,res) {

       const {email} = req.body;
       
       let user = await User.findOne({email});

       if(!user) {

        user = await User.create({email});

       } else {

        return res.json({error: "User already exists", user});

       }

       return res.json({message: 'User created',user});

    }

}

module.exports = new SessionController();