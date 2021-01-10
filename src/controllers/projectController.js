const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Usuarios = require('../models/user')

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const usuarios = await Usuarios.find();
        return res.send({usuarios})
    }catch(err){
        return res.status(400).send({error: 'Error loading users'})
    }
})



module.exports = app => app.use('/projects', router);
