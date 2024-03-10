import { PrismaWalletsRepository } from '@modules/Wallet/repositories/prisma/PrismaWalletsRepository';
import { Controller } from "@core/infra/Controller";
import { GetAllWalletsByUser } from '@modules/Wallet/useCases/getAllWalletsByUser/getAllWalletsByUser';
import { GetAllWalletsByUserController } from '@modules/Wallet/useCases/getAllWalletsByUser/getAllWalletsByUserController';

export function makeGetAllWalletsByUserController(): Controller {
  const prismaWalletsRepository =  new PrismaWalletsRepository()
  const getAllWalletsByUser = new GetAllWalletsByUser(prismaWalletsRepository)

  const getAllWalletsByUserController = new GetAllWalletsByUserController(getAllWalletsByUser)

  return getAllWalletsByUserController
}