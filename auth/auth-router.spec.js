const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')

describe('authRouter', () => {
  beforeAll(async () => await db('users').truncate())

  describe('/api/auth/register', () => {
    test('returns a status of 201 and a user id', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'username', password: 'password' })

      expect(res.status).toBe(201)
      expect(JSON.parse(res.text)).toHaveProperty('id')
    })
  })

  describe('/api/auth/login', () => {
    test('returns a status of 200 and a token', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'username', password: 'password' })

      expect(res.status).toBe(200)
      expect(JSON.parse(res.text).token).toBeTruthy()
    })
  })
})