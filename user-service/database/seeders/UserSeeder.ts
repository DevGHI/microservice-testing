import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await User.createMany([
      {
        name: 'user1',
        email: 'user1@demo.com',
        password: 'testadmin',
      },
      {
        name: 'user2',
        email: 'user2@demo.com',
        password: 'testadmin',
      },
    ])
  }
}
