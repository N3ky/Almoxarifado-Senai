import express from 'express';
import cors from 'cors';
import {DatabasePostgres} from './databasePostgres';
import './createTable';
import bcrypt from 'bcrypt';
import jwt from 'jwtbtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabasePostgres();

// ========== AUTH =================

// REGISTER

app.post('/auth/resgister', async(req, res) =>{
    const {name, email, password, setor} = req.body;

    const userExists = await db.findUserByEmail(email);
    if(userExists) return res.status(400).json({msg:'Email já existe'});

    await db.createUser({ name, email, password, setor})
    res.status(201).json({msg: 'Usuario criado'});
});

//LOGIN

app.post('auth/login', async(req, res)=>{
    const {email, password} = req.body;

    const user = await db.findUserByEmail(email);
    if(!user)return
    res.status(400).json({ msg: 'Usuario não encontrado'});

    const valid = await bcrypt.compare(password, user.password);
    
});