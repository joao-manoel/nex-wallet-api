import { Either, left, right } from "@core/logic/Either";
import { Wallet } from "@modules/Wallet/domain/wallet/wallet";
import { WalletNotFoundError } from "@modules/Wallet/errors/WalletNotFoundError";
import { IWalletRepository } from "@modules/Wallet/repositories/IWalletRepository";

type UserWalletResponse = {
  id: string
  name: string
}

type GetUserWalletResponse = Either<WalletNotFoundError, UserWalletResponse>

export class GetUserWallet {
  constructor(
    private walletRepository: IWalletRepository,
  ){}

  async execute({ id, userId}): Promise<GetUserWalletResponse>{
    const wallet = await this.walletRepository.findByIdWithUserId(id, userId)

    if(!wallet){
      return left(new WalletNotFoundError())
    }

    return right({
      id: wallet.id,
      name: wallet.name.value
    })
  }
}