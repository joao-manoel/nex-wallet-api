import { Either, left, right } from '@core/logic/Either';
import { IWalletRepository } from "@modules/Wallet/repositories/IWalletRepository";
import { WalletNotFoundError } from '@modules/Wallet/errors/WalletNotFoundError';

type getAllWalletsByUserResponse = {
  wallets: {
    id: string
    name: string
  }[]
}

type GetAllWalletsByUserResponse = Either<WalletNotFoundError, getAllWalletsByUserResponse>

export class GetAllWalletsByUser {
  constructor(
    private walletRepository: IWalletRepository,
  ){}

  async execute({ userId }): Promise<GetAllWalletsByUserResponse> {
    const wallets = await this.walletRepository.findAllWalletsByUserId(userId)


    console.log(wallets)

    if(!wallets) {
      return left(new WalletNotFoundError())
    }


    return right(wallets)

  }
}