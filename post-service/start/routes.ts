/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// Route.get('/', async () => {
//   return { hello: 'hello post service' }
// })


Route.post('posts/create','PostsController.store')
Route.get('posts','PostsController.index')
Route.get('posts/:id','PostsController.show')

Route.post('posts/comments/:post_id','PostsController.submitComment')

Route.get('posts/send/', 'PostsController.send')
