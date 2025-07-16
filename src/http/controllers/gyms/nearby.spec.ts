import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest'
import {app} from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym e2e', () => {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async()=> {
        await app.close()
    })

    it('should be able list nearby gym', async () => {
        const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JSG',
                description: '...',
                phone: '00000000',
                latitude: -27.2,
                longitude: -49.6, 
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TSG',
                description: '...',
                phone: '00000000',
                latitude: -27.0,
                longitude: -49.5, 
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
               latitude: -27.2,
               longitude: -49.6,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JSG',
            })
        ])
    })
})