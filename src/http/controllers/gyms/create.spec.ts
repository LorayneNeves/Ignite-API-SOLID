import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest'
import {app} from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym e2e', () => {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async()=> {
        await app.close()
    })

    it('should be able regs', async () => {
        const {token} = await createAndAuthenticateUser(app, true)
        
        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JSG',
                description: '...',
                phone: '00000000',
                latitude: -27.2892852,
                longitude: -49.6481891,
            })

        expect(response.statusCode).toEqual(201)
    })
})