
const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    genero: {
        type: String,
        enum: ['Masculino','Feminino'],
        default:'Masculino'
    },
    dataNascimento:{
        type:Date,
        required:true,
        min:'1998-09-18',
        max:'2021-01-18'
    },
    adress:{
        type: String,
        required: true,
    },
    cidade:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
    },
    bairro:{
        type: String,
        required: true,
    },
    cep:{
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10 )
    this.senha = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;