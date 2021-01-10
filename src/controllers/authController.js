const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user');

const router = express.Router();

// gerando token
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        // token expira em 1 dia
        expiresIn: 86400,
    });
}

// registro de usuarios
router.post('/register', async (req, res) => {
    const {email} = req.body;
    try{
        if(await User.findOne({email}))
        return res.status(400).send({ error: 'Usuario já existe'});

        const user = await User.create(req.body);

        user.senha = undefined;
        return res.send({
            user,
            token: generateToken({ id: user.id}),
        });
    } catch(err){
        return res.status(400).send({error: 'Registration failed'});
    }
});

// login de usuarios
router.post('/authenticate', async (req, res) => {
    const {email, senha} = req.body;

    const user = await User.findOne({email}).select('+senha');

    if(!user)
    return res.status(400).send({ error : 'Usuario não encontrado'})

    if(!await bcrypt.compare(senha, user.senha))
    return res.status(400).send({error: 'senha invalida'})

// para não retornar o hash
    user.senha = undefined;
    
    res.send({
        user, 
        token: generateToken({ id: user.id}),
    });
})
module.exports = app => app.use('/auth', router);