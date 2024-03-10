import { Controller } from "@core/infra/Controller";
import { PrismaWalletsRepository } from "@modules/Wallet/repositories/prisma/PrismaWalletsRepository";
import { GetWalletByUser } from "@modules/Wallet/useCases/getWalletByUser/getWalletByUser";
import { GetWalletByUserController } from "@modules/Wallet/useCases/getWalletByUser/getWalletByUserController";

export function makeGetWalletByUserController(): Controller{
  const prismaWalletRepository = new PrismaWalletsRepository()
  const getWalletByUser = new GetWalletByUser(prismaWalletRepository)
  const getWalletByUserController = new GetWalletByUserController(getWalletByUser)

  return getWalletByUserController
}