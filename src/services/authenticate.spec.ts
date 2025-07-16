import {describe, it, test, expect, beforeEach} from 'vitest'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { hash } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlredyExistsError } from './errors/user-already-exists-error';
import { before, skip } from 'node:test';
import { AuthenticateService } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate User case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able tp Authenticate', async () => { // valida cadastro user
        await usersRepository.create({
            name: 'jo',
            email: 'john@example.com',
            password_hash: await hash('123456', 6),
        })

        const {user} = await sut.execute({
            email: 'john@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able Authenticate with wrong email', async () => { // valida cadastro user
        expect(() => 
            sut.execute({
                email: 'john@example.com',
                password: '123456',
                }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able Authenticate with wrong email', async () => { // valida cadastro user
        await usersRepository.create({
            name: 'jo',
            email: 'john@example.com',
            password_hash: await hash('123456', 6),
        })

        await expect(() => 
            sut.execute({
                email: 'john@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})