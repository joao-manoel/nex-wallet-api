import { Wallet } from "@modules/Wallet/domain/wallet/wallet";
import { IWalletRepository } from "../IWalletRepository";
import { prisma } from "@infra/prisma/client";
import { WalletMapper } from "@modules/Wallet/mappers/walletMapper";

export class PrismaWalletsRepository implements IWalletRepository {
  async findById(id: string): Promise<Wallet> {
    const wallet = await prisma.wallet.findUnique({
      where: {
        id
      }
    })

    if(!wallet){
      return null
    }

    return WalletMapper.toDomain(wallet)
  }

  async findAllWalletsByUserId(userId: string): Promise<any>{
    const wallets = await prisma.wallet.findMany({
      where: {
        userId
      }
    })

    if(!wallets) return null

    return WalletMapper.toDto({
      wallets: wallets.map(wallet => {
        return {
          id: wallet.id,
          name: wallet.name
        }
      })
    })
  }

  async findByIdWithUserId(id: string, userId: string): Promise<Wallet> {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id,
        userId
      },
    })

    if(!wallet){
      return null
    }

    return WalletMapper.toDomain(wallet)
  }

  async findByUserIdWithName(userId: string, name: string): Promise<Wallet> {

    const wallet = await prisma.wallet.findFirst({
      where: {
        userId,
        name
      }
    })

    if(!wallet){
      return null
    }

    return WalletMapper.toDomain(wallet)
  }
  save(wallet: Wallet): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(wallet: Wallet): Promise<void> {
    const data = await WalletMapper.toPersistence(wallet)

    await prisma.wallet.create({
      data
    })
  }
  async findAll(skip: number, take: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

}