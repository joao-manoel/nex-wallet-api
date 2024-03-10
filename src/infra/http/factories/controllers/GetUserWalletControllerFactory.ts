import { Controller } from "@core/infra/Controller";
import { PrismaWalletsRepository } from "@modules/Wallet/repositories/prisma/PrismaWalletsRepository";
import { GetUserWallet } from "@modules/Wallet/useCases/getUserWallet/getUserWallet";
import { GetUserWalletController } from "@modules/Wallet/useCases/getUserWallet/getUserWalletController";

export function makeGetUserWalletController(): Controller{
  const prismaWalletRepository = new PrismaWalletsRepository()
  const getUserWallet = new GetUserWallet(prismaWalletRepository)
  const getUserWalletController = new GetUserWalletController(getUserWallet)

  return getUserWalletController
}