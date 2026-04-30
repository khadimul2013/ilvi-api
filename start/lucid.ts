import { BaseModel } from '@adonisjs/lucid/orm'
import { SimplePaginator } from '@adonisjs/lucid/database'
import { CamelCaseNamingStrategy } from '#helpers/camel_case_naming_strategy'

const camelCaseNamingStrategy = new CamelCaseNamingStrategy()

BaseModel.namingStrategy = camelCaseNamingStrategy
SimplePaginator.namingStrategy = camelCaseNamingStrategy
