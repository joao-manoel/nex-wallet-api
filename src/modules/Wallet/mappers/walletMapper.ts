import { Name } from '../domain/wallet/name';
import { WalletListDto } from '../dtos/WalletListDto';
import { Wallet } from './../domain/wallet/wallet';
import {Wallet as PersistenceWallet} from "@prisma/client"

type PersistenceRaw = {
  total: number
  totalPage: number
  wallets: {
    id: string
    name: string
    user: {
      id: string
    }
  }[]
}

export class WalletMapper {
  static toDomain(raw: PersistenceWallet): Wallet {

    const nameOrError = Name.create(raw.name)

    if(nameOrError.isLeft()){
      throw new Error('name value is invalid.')
    }
    
    const walletOrError = Wallet.create({
      name: nameOrError.value,
      userId: raw.userId
    })

    if(walletOrError.isRight()){
      return walletOrError.value
    }

    return null
  }

  static async toPersistence(wallet: Wallet){
    return {
      id: wallet.id,
      name: wallet.name.value,
      userId: wallet.userId
    }
  }

  static toDto(raw: PersistenceRaw): WalletListDto {
    return {
      total: raw.total,
      totalPage: raw.totalPage,
      wallets: raw.wallets.map(wallet => {
        return {
          id: wallet.id,
          name: wallet.name,
          user: wallet.user
        }
      })
    }
  }
}
