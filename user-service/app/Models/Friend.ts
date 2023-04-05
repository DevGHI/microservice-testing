import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Friend extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sender_user_id: number

  @column()
  public receiver_user_id: number

  @belongsTo(() => User, { foreignKey: 'sender_user_id', localKey: 'id' })
  public sender: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'receiver_user_id', localKey: 'id' })
  public receiver: BelongsTo<typeof User>

  @column()
  public status: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
