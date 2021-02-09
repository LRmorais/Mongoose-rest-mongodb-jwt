const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
// divide a validação em partes mais simples para diminuir o consumo de processamento
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({error:"No token provided"})
    }else{
        // token começa com Bearer
        const token = authHeader.replace('Bearer ','');
        console.log(token);
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({error:"token invalided"})
            }else{
                req.userId = decoded.id;
                return next()
            }   
        })
    }
}