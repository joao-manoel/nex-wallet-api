import { Either, left, right } from "@core/logic/Either";
import { WalletNotFoundError } from "@modules/Wallet/errors/WalletNotFoundError";
import { IWalletRepository } from "@modules/Wallet/repositories/IWalletRepository";

type WalletByUserResponse = {
  id: string
  name: string
}

type GetWalletByUserResponse = Either<WalletNotFoundError, WalletByUserResponse>

export class GetWalletByUser {
  constructor(
    private walletRepository: IWalletRepository,
  ){}

  async execute({ id, userId}): Promise<GetWalletByUserResponse>{
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