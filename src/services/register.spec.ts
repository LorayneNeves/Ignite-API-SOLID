import {describe, it, expect, beforeEach} from 'vitest'
import { RegisterService } from './register';
import { compare } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlredyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository
let sut: RegisterService
describe('Register User case', () => { 
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })

    it('should be able tp register', async () => { // valida cadastro user

        const {user} = await sut.execute({
            name: 'John ',
            email: 'john1@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash uber password upon registration', async () => { // valida senha user

        const {user} = await sut.execute({
            name: 'John ',
            email: 'john1@example.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email', async () => { // valida email user

        const email = 'john@example.com'

        await sut.execute({
            name: 'John ',
            email: 'john@example.com',
            password: '123456',
        })

        await expect(() =>
            sut.execute({
                name: 'John doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlredyExistsError)

    })
})