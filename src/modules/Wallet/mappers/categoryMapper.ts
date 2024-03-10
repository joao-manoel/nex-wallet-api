import {InvoiceCategory as PersistenceCategory} from "@prisma/client"

import { Category } from '../domain/category/category';
import { Color } from '../domain/category/color';
import { Name } from '../domain/category/name';

type PersistenceRaw = {
  categorys: {
    id: string
    name: string
    color: string
  }[]
}


export class CategoryMapper {
  static toDomain(raw: PersistenceCategory): Category {

    const nameOrError = Name.create(raw.name)
    const colorOrError = Color.create(raw.color)

    if(nameOrError.isLeft()){
      throw new Error('name value is invalid.')
    }

    if(colorOrError.isLeft()){
      throw new Error('color value is invalid.')
    }
    
    const categoryOrError = Category.create({
      name: nameOrError.value,
      color: colorOrError.value
    })

    if(categoryOrError.isRight()){
      return categoryOrError.value
    }

    return null
  }

  static async toPersistence(category: Category){
    return {
      id: category.id,
      name: category.name.value,
      color: category.color.value
    }
  }

  static async toDto(raw: PersistenceRaw){
    return {
      categorys: raw.categorys.map(category => {
        return {
          id: category.id,
          name: category.name,
          color: category.color
        }

      })
    }
  } 


}
