import {describe, it, test, expect, beforeEach} from 'vitest'
import { hash } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileService } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('GetUserProfile User case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to GetUserProfile', async () => { 
        const createUser = await usersRepository.create({
            name: 'jo',
            email: 'john@example.com',
            password_hash: await hash('123456', 6),
        })

        const {user} = await sut.execute({
            userId: createUser.id
        })

        expect(user.name).toEqual('jo')
    })

    it('should not be able GetUserProfile with user profile id', async () => { 
        await expect(() => 
            sut.execute({
                userId: 'non-existing-id',
                }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
})