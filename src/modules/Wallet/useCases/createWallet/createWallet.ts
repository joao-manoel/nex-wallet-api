import { Either, left, right } from "@core/logic/Either";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { IUserRepository } from "@modules/Account/repositories/IUserRepository";
import { InvalidNameError } from "@modules/Wallet/domain/wallet/errors/invalidNameError";
import { UserIdRequiredError } from "@modules/Wallet/domain/wallet/errors/userIdRequiredError";
import { Name } from "@modules/Wallet/domain/wallet/name";
import { Wallet } from "@modules/Wallet/domain/wallet/wallet";
import { IWalletRepository } from "@modules/Wallet/repositories/IWalletRepository";
import { WalletNameExistError } from "./errors/WalletNameExistError";

type CreateWalletResponse = Either<
InvalidNameError 
| UserNotFoundError
| UserIdRequiredError
| UserNotFoundError
| WalletNameExistError
, Wallet>

export class CreateWallet {
  constructor(
    private userRepository: IUserRepository,
    private walletRepository: IWalletRepository
  ){}

  async execute({name, userId}): Promise<CreateWalletResponse>{

    const nameOrError = Name.create(name)

    if(nameOrError.isLeft()){
      return left(nameOrError.value)
    }

    if(!userId || userId === null){
      return left(new UserIdRequiredError())
    }

    const userExist = await this.userRepository.findById(userId)

    if(!userExist){
      return left(new UserNotFoundError())
    }

    const walletOrError = Wallet.create({
      name: nameOrError.value,
      userId
    })

    if(walletOrError.isLeft()){
      return left(walletOrError.value)
    }

    const walletAlreadyExistWithName = await this.walletRepository.findByUserIdAndName(userId, name)

    if(walletAlreadyExistWithName){
      return left(new WalletNameExistError(name))
    }

    const wallet = walletOrError.value    

    await this.walletRepository.create(wallet)
    
    return right(wallet)

  }
}