import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeCreateWalletController } from '@infra/http/factories/controllers/CreateWalletControllerFactory';
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware';
import express from 'express'

const walletsRouter = express.Router();

walletsRouter.post('/', adaptMiddleware(makeEnsureAuthenticatedMiddleware()),adaptRoute(makeCreateWalletController()))


export {walletsRouter}