import { Entity } from "@core/domain/Entity";
import { Either, right } from '@core/logic/Either';

import { Name } from "./name";
import { Color } from './color';

import { InvalidNameError } from '../../errors/invalidNameError';
import { InvalidColorError } from '../../errors/invalidColorError';

interface ICategoryProps {
  name: Name
  color: Color
}

export class Category extends Entity<ICategoryProps>{
  get name(){
    return this.props.name
  }

  get color() {
    return this.props.color
  }

  constructor(props: ICategoryProps, id?: string) {
    super(props, id);
  }

  static create(props: ICategoryProps, id?: string): Either<InvalidNameError | InvalidColorError, Category> {
  
    const category = new Category(props, id)

    return right(category)

  }

}