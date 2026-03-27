import { randomUUID } from "node:crypto";
import { sql } from './sql.js';
import bcrypt from 'bcrypt';

export class DatabasePostgres{
    // =========== User ===========
    async listUser(){
        return await sql`SELECT * FROM users`;
    }

    async createUser(user){
        const id = randomUUID();
        const { name, email, password, setor} = user;
        const hash = await bcrypt.hash(password, 10); 

        await sql`
            INSERT INTO users(id, name, email, password, setor) VALUES 
            (${id}, ${name}, ${email}, ${password}, ${setor})
        `;
    }

    async findUserByEmail(email){
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        return result[0];
    }

    // =========== itens ===========
    async listItens(){
        return await sql`SELECT * FROM itens`;
    }

    async createItem(item){
        const id = randomUUID();
        const { nome, descricao} = item;
    
        await sql `
            INSERT INTO itens (id, nome, descricao) VALUES (${id}, ${nome}, ${descricao})
        `; 
    }

    async updateItemStatus(id, status){
        await sql`
            UPDATE itens SET status=${status} WHERE id = ${id}
        `;
    }

    // =========== Movimentacao ===========
    async registrarMovimentacao({ tipo, usuario_id, item_id}){
        const id = randomUUID();

        await sql`
            INSERT INTO movimentacoes(id, tipo, usuario_id, item_id) VALUES (${id}, ${tipo}, ${usuario_id}, ${item_id})
        `;
    }

    async listMovimentacoes(){
        return await sql`
            SELECT 
                m.id,
                m.tipo,
                m.data,
                u.name as usuario,
                i.nome as item
            FROM movimentacoes m
            JOIN users u ON u.id = m.usuario_id
            JOIN itens i ON i.id = m.item_id 
            ORDER BY m.data DESC
        `;
    }
}