import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidColorError extends Error implements DomainError {
  constructor(color: string){
    super(`The color hex "${color}" is invalid.`)
    this.name = 'InvalidColorError'
  }
}