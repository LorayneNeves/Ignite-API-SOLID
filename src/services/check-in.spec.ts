import {describe, it, vi, expect, beforeEach, afterEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInService } from './check-in';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService
let gymsRepository: InMemoryGymsRepository

describe('CheckInService User case', () => { 
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(gymsRepository, checkInsRepository)

        await gymsRepository.create({
             id: 'gym-01',
            title: 'js gym',
            description:'',
            phone: '',
            latitude: -27.2,
            longitude: -49.6,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able tp CheckInService', async () => {
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2,
            userLongitude: -49.6,       
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be able to CheckInService in twice in the same day', async () => { 
        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2,
            userLongitude: -49.6,
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2,
            userLongitude: -49.6,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to CheckInService in twice in the different day', async () => { 
        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))
        
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2,
            userLongitude: -49.6,
        })

        vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2,
            userLongitude: -49.6,
        })
    
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be able to CheckInService on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'js gym',
            description:'',
            phone: '',
            latitude: new Decimal(-27.0),
            longitude: new Decimal(-49.4),
        })

        await expect(() =>  
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -27.2,
                userLongitude: -49.6,       
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
})