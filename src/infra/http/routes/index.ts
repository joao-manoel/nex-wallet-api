import { Router } from 'express'
import { sessionsRouter } from './user/session.routes'
import { usersRouter } from './user/users.routes'
import { walletsRouter } from './wallet/wallets.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/session', sessionsRouter)
router.use('/wallet', walletsRouter)

export { router }

