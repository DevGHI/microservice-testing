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

Route.get('/users','UsersController.index')


Route.post('users/login', 'UsersController.login')
Route.post('users/register', 'UsersController.register')
Route.post('users/add-friend', 'UsersController.addFriend')
Route.get('users/friend-lists', 'UsersController.friendLists')
Route.post('users/accept-friend', 'UsersController.acceptFriend')
Route.get('users/profile/:id', 'UsersController.profile')
Route.delete('users/:id', 'UsersController.delete')
