import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { FastifyInstance } from "fastify"
import request from "supertest"


export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false){
    await prisma.user.create({
        data:{
            name: 'teste',
            email: 'tt@g.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' :  'MEMBER',
        }
    })
        
        const authResponse = await request(app.server).post('/sessions').send({
            email: 'tt@g.com',
            password: '123456',
        })

        const {token} = authResponse.body

        return {
            token,
        }
}