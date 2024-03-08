import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class UserIdRequiredError extends Error implements UseCaseError {
  constructor() {
    super(`userID are required.`)
    this.name = 'UserIdRequiredError'
  }
}