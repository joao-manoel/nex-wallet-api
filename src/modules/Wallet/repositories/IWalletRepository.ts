import { Wallet } from "../domain/wallet/wallet"
import { WalletListDto } from "../dtos/WalletListDto"

export interface IWalletRepository {
  findById(id: string): Promise<Wallet>
  findAllWalletsByUserId(userId: string): Promise<WalletListDto>
  findByIdWithUserId(id: string, userId: string): Promise<Wallet>
  findAll(skip: number, take: number): Promise<any>
  findByUserIdWithName(userId: string, name: string): Promise<Wallet>
  save(wallet: Wallet): Promise<void>
  create(wallet: Wallet): Promise<void>

}