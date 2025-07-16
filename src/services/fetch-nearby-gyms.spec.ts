import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsService } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('search Gymservice History User case', () => { 
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsService(gymsRepository)
    })

     it('should be able to search check', async () => {
        await gymsRepository.create({
            title: 'near',
            description: null,
            phone: null,
            latitude: -27.2,
            longitude: -49.6, 
        })

        await gymsRepository.create({
            title: 'far',
            description: null,
            phone: null,
            latitude: -27.0,
            longitude: -49.5, 
        })

        const {gyms} = await sut.execute({
            userLatitude: -27.2,
            userLongitude: -49.6,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'near'})])
    })
})