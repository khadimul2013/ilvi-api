import { BaseModel as LucidBaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuid } from 'uuid'
import { CamelCaseNamingStrategy } from '#helpers/camel_case_naming_strategy'

export default class BaseModel extends LucidBaseModel {
  static namingStrategy = new CamelCaseNamingStrategy()

  public primaryKey = 'uuid'

  @column({ isPrimary: true })
  public uuid!: string

  @beforeCreate()
  static beforeCreate(model: BaseModel) {
    if (this.$hasColumn('uuid') && !model.uuid) {
      model.uuid = uuid()
    }
  }
}
