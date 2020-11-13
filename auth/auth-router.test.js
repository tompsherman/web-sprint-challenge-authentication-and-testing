const request = require('supertest')
const server = require('../api/server') 

describe('auth-router.js', ()=>{
    it('is testing', ()=>{
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe('[GET] /test', ()=>{

        it('gets the test', async ()=>{
            const res = await request(server).get('/api/auth/test')
            expect(res.status).toBe(200)
        })
        it('responnds in json', async()=>{
            const res = await request(server).get('/api/auth/test')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('[POST] /register', ()=>{

        it('doesnt post the test', async ()=>{
            const req = {username: "test", password: "1234"}
            const res = await request(server).post('/api/auth/register', req)
            expect(res.status).toBe(400)
        })
        it('responnds in json', async()=>{
            const req = {username: "test", password: "1234"}
            const res = await request(server).post('/api/auth/register', req)
            expect(res.type).toMatch(/json/)
        })
    })
    describe('[POST] /login', ()=>{

        it('doesnt log in', async ()=>{
            const req = {username: "test", password: "1234"}
            const res = await request(server).post('/api/auth/login', req)
            expect(res.status).toBe(400)
        })
        it('responnds in json', async()=>{
            const req = {username: "test", password: "1234"}
            const res = await request(server).post('/api/auth/login', req)
            expect(res.type).toMatch(/json/)
        })
    })
}) 