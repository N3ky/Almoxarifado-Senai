import express from 'express';
import cors from 'cors';
import { DatabasePostgres } from './databasePostgres.js';
import './createTable.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabasePostgres();

// =========== AUTH ===========

// Register

app.post('/auth/register', async(req, res) => {
    const { name, email, password, setor} = req.body;

    const userExists = await db.findUserByEmail(email);
    if(userExists) return res.status(400).json({msg:'Email já existe'});

    await db.createUser({ name, email, password, setor})
    res.status(201).json({ msg: 'Usuário criado'});
});

// LOGIN
app.post('auth/login', async(req, res) =>{
    const {email, password} = req.body;

    const user = await db.findUserByEmail(email);
    if(!user)return
    res.status(400).json({ msg: 'Usuário não encontrado'});

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({ msg: 'Senha inválida' });

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

    res.json({ token, user});
});

// =========== MIDDLEWARE ===========
function auth(req, res, next){
    const token = req.headers.authorezation?.split(' ')[1];
    if(!token) return res.status(401).json({ msg: 'sem token'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch{
        res.status(401).json({ msg: 'Token inválido' });
    }
}

// =========== Itens ===========

// Listar
app.get('/itens', auth, async(req, res) =>{
    const itens = await db.listItens();
    res.json(itens);
});

// Criar
app.post('/itens', auth, async(req, res) => {
    await db.createItem(req.body);
    res.status(201).send();
});

// =========== Movimentação ===========

//Retirar
app.post('/retirar', auth, async(req, res) => {
    const { item_id } = req.body;

    await db.updateItemStatus(item_id, 'emprestado');

    await db.registrarMovimentacao({
        tipo: 'retirada',
        usuario_id: req.user.id,
        item_id
    });

    res.json({ msg: 'Item retirado'});
});

//Devolver
app.post('/devolver', auth, async(req, res) => {
    const { item_id } = req.body;

    await db.updateItemStatus(item_id, 'disponivel');

    await db.registrarMovimentacao({
        tipo: 'devolucao',
        usuario_id: req.user.id,
        item_id
    });

    res.json({ msg: 'Item devolvido' });
});

//Histórico
app.get('/movimentacoes', auth, async(req, res) => {
    const data = await db.listMovimentacoes();
    res.json(data);
});

// =========== SERVER ===========
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
}); 