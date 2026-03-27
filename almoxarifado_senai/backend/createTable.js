import { sql } from './sql.js'

// USERS
await sql `
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL,
    setor TEXT
);
`

// ITENS
await sql `
CREATE TABLE IF NOT EXISTS itens(
    id UUID PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    status TEXT DEFAULT 'disponivel'
);
`

// MOVIMENTACOES
await sql`
CREATE TABLE IF NOT EXISTS movimentacoes(
    id UUID PRIMARY KEY,
    tipo TEXT NOT NULL,
    usuario_id UUID,
    item_id UUID,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`