import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/posts')

  response.assertStatus(200)
  response.assertBodyContains({ hello: 'world' })
})
