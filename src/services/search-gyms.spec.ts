import {describe, it, expect, beforeEach} from 'vitest'
import { SearchGymsService } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('search Gymservice History User case', () => { 
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsService(gymsRepository)
    })

     it('should be able to search check', async () => {
        await gymsRepository.create({
            title: 'js',
            description: null,
            phone: null,
            latitude: -27.2,
            longitude: -49.6, 
        })

        await gymsRepository.create({
            title: 'ts',
            description: null,
            phone: null,
            latitude: -27.2,
            longitude: -49.6, 
        })

        const {gyms} = await sut.execute({
            query: 'js',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'js'})])
    })

    it('should be able to search check', async () => {
        for(let i = 1; i <= 22 ; i++ ){
            await gymsRepository.create({
                title: `js ${i}`,
                description: null,
                phone: null,
                latitude: -27.2,
                longitude: -49.6,
            })
        }

        const {gyms} = await sut.execute({
            query: 'js',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'js 21'}),
            expect.objectContaining({title: 'js 22'})
        ])
    })
})