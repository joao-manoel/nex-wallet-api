import { Controller } from "@core/infra/Controller";
import { GetWalletByUser } from "./getWalletByUser";
import { HttpResponse, clientError, fail, notFound, ok } from "@core/infra/HttpResponse";
import { WalletNotFoundError } from "@modules/Wallet/errors/WalletNotFoundError";

type GetWalletByUserRequest = {
  id: string
  userId: string
}

export class GetWalletByUserController implements Controller {
  constructor(private getUserWallet: GetWalletByUser){}

  async handle({id, userId}: GetWalletByUserRequest ): Promise<HttpResponse> {
    
    try {
      const result = await this.getUserWallet.execute({
        id, userId
      });

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case WalletNotFoundError:
            return notFound(error)
          default:
            return clientError(error)
        }
      }else {
        const wallet = result.value
        return ok(wallet)
      }
    } catch (err) {
      return fail(err)
    }

  }
}