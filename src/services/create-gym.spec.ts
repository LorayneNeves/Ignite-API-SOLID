import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from './create-gym';

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('CreateGym User case', () => { 
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymsRepository)
    })

    it('should be able tp CreateGym', async () => {
        const {gym} = await sut.execute({
            title: 'js',
            description: null,
            phone: null,
            latitude: -27.2892852,
            longitude: -49.6481891,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})