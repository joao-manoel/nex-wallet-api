import { DomainError } from "@core/domain/errors/DomainError";

export class UserIdRequiredError extends Error implements DomainError {
  constructor(){
    super(`The user id is required.`)
    this.name = 'UserIdRequiredError'
  }
}