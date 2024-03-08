import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class WalletNameExistError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`The wallet name '${name}' is already registered.`)
    this.name = 'WalletNameExistError'
  }
}