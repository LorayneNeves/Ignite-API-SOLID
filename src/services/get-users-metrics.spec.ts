import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsService } from './get-users-metrics';

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('GET CheckInService History User case', () => { 
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository)
    })

     it('should be able to GET check', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const {checkInsCount} = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})