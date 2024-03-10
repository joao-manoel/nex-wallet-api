import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, fail, notFound, ok } from "@core/infra/HttpResponse";
import { GetAllWalletsByUser } from "./getAllWalletsByUser";
import { WalletNotFoundError } from "@modules/Wallet/errors/WalletNotFoundError";

type GetAllWalletsByUserRequest = {
  userId: string
}

export class GetAllWalletsByUserController implements Controller {
  constructor(private getAllWalletByUser: GetAllWalletsByUser){}

  async handle({userId}: GetAllWalletsByUserRequest): Promise<HttpResponse> {
    try {
      const result = await this.getAllWalletByUser.execute({
        userId
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case WalletNotFoundError:
            return notFound(error)
          default: 
            return clientError(error)
        }
      }else {
        const wallets = result.value

        return ok(wallets)
      }
      
    } catch (err) {
      fail(err)
    }
  }
}