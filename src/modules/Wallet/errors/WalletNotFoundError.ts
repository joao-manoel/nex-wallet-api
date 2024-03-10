import { DomainError } from "@core/domain/errors/DomainError";

export class WalletNotFoundError extends Error implements DomainError {
  constructor(){
    super(`Wallet not found.`)
    this.name = 'WalletNotFoundError'
  }
}