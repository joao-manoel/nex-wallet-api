import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUserRepository";
import { PrismaWalletsRepository } from "@modules/Wallet/repositories/prisma/PrismaWalletsRepository";
import { CreateWallet } from "@modules/Wallet/useCases/createWallet/createWallet";
import { CreateWalletController } from "@modules/Wallet/useCases/createWallet/createWalletController";

export function makeCreateWalletController(): Controller{


  const prismaUserRepository = new PrismaUsersRepository()
  const prismaWalletRepository = new PrismaWalletsRepository()
  const createWallet = new CreateWallet(prismaUserRepository, prismaWalletRepository);

  const createWalletController = new CreateWalletController(createWallet)

  return createWalletController
}