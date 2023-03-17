import * as request from 'supertest'
import { app } from './index'

test('get / responds with 200 OK', async () => {
  const response = await request(app.callback()).get('/')
  expect(response.statusCode).toBe(200)
  expect(response.text).toEqual('Hello world')
})

test('add more test', async () => {
  const a = 1
  const b = 1
  expect(a + b).toBe(2)
})
