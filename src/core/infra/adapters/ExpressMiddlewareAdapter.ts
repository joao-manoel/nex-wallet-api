import { NextFunction, Request, Response } from 'express';

import { Middleware } from '../Middleware';


export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.['x-access-token'],
      userId: request.userId,
      ...(request.headers || {}),
    }

    const httpResponse = await middleware.handle(requestData, request.body)

    /**
     * Not an error, but stop request process
     */
    if (httpResponse === false) {
      return response.status(200).send()
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)

      return next()
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
    }
  }
}