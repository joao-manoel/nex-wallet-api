import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeCreateWalletController } from '@infra/http/factories/controllers/CreateWalletControllerFactory';
import { makeGetAllWalletsByUserController } from '@infra/http/factories/controllers/GetAllWalletsByUserControllerFactory';
import { makeGetWalletByUserController } from '@infra/http/factories/controllers/GetWalletByUserControllerFactory';
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware';
import express from 'express'

const walletsRouter = express.Router();

walletsRouter.post('/', adaptMiddleware(makeEnsureAuthenticatedMiddleware()),adaptRoute(makeCreateWalletController()))
walletsRouter.get('/:id', adaptMiddleware(makeEnsureAuthenticatedMiddleware()),adaptRoute(makeGetWalletByUserController()))
walletsRouter.get('/user/all', adaptMiddleware(makeEnsureAuthenticatedMiddleware()),adaptRoute(makeGetAllWalletsByUserController()))

export {walletsRouter}