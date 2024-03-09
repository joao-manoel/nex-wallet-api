import { Either, left, right } from "@core/logic/Either";
import { InvalidColorError } from "@modules/Wallet/errors/invalidColorError";

export class Color {
  private readonly color: string;

  get value(): string {
    return this.color;
  }

  private constructor(color: string) {
    this.color = color;
  }

  static validate(color: string): boolean {
    if(!color || color.trim().length < 2 || color.trim().length > 60) {
      return false
    }

    return true
  }


  static create(color: string): Either<InvalidColorError, Color>{
    if(!this.validate(color)){
      return left(new InvalidColorError(color))
    }

    return right(new Color(color))
  }
  

}