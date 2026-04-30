import string from '@poppinss/utils/string'
import type { LucidModel, NamingStrategyContract } from '@adonisjs/lucid/types/model'
import type { ModelRelations } from '@adonisjs/lucid/types/relations'

export class CamelCaseNamingStrategy implements NamingStrategyContract {
  tableName(model: LucidModel): string {
    return string.pluralize(string.camelCase(model.name))
  }

  columnName(_: LucidModel, attributeName: string): string {
    return string.camelCase(attributeName)
  }

  serializedName(_: LucidModel, attributeName: string): string {
    return string.camelCase(attributeName)
  }

  relationLocalKey(
    relation: ModelRelations<LucidModel, LucidModel>['__opaque_type'],
    model: LucidModel,
    relatedModel: LucidModel
  ): string {
    if (relation === 'belongsTo') {
      return relatedModel.primaryKey
    }

    return model.primaryKey
  }

  relationForeignKey(
    relation: ModelRelations<LucidModel, LucidModel>['__opaque_type'],
    model: LucidModel,
    relatedModel: LucidModel
  ): string {
    if (relation === 'belongsTo') {
      return string.camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`)
    }

    return string.camelCase(`${model.name}_${model.primaryKey}`)
  }

  relationPivotTable(_: 'manyToMany', model: LucidModel, relatedModel: LucidModel): string {
    return string.camelCase([relatedModel.name, model.name].sort().join('_'))
  }

  relationPivotForeignKey(_: 'manyToMany', model: LucidModel): string {
    return string.camelCase(`${model.name}_${model.primaryKey}`)
  }

  paginationMetaKeys() {
    return {
      total: 'total',
      perPage: 'perPage',
      currentPage: 'currentPage',
      lastPage: 'lastPage',
      firstPage: 'firstPage',
      firstPageUrl: 'firstPageUrl',
      lastPageUrl: 'lastPageUrl',
      nextPageUrl: 'nextPageUrl',
      previousPageUrl: 'previousPageUrl',
    }
  }
}
