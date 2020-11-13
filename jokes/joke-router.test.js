const request = require('supertest')
const server = require('../api/server') 

describe('jokes-router.js', ()=>{
    it('is testing', ()=>{
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe('[GET] /test', ()=>{
        // it('works with supertest', ()=>{
        //     return request(router).get('/test').expect('content-type', /json/)
        // })
        it('wont gget the data', async ()=>{
            const res = await request(server).get('/api/jokes/test')
            expect(res.status).toBe(401)
        })
        it('responnds in json', async()=>{
            const res = await request(server).get('/api/jokes/')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('[GET] /', ()=>{
        it('wont get the data', async()=>{
            const res = await request(server).get('/api/jokes/')
            expect(res.status).toBe(401)
        })
        it('responnds in json', async()=>{
            const res = await request(server).get('/api/jokes/')
            expect(res.type).toMatch(/json/)
        })
    })
})