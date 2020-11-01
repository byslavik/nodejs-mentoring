import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { logger } from '../../logger';
import performanceLogger from '../../logger/middlewares/performanceLogger';

import {
  // methods
  validateUser,
  getToken,
  // validators
  loginValidator,
  LoginRequestSchema,
} from '../../services/login';
import { User } from '../../models';
import { ERRORS } from '../../constants';

import { errorHandler } from './login.errorHandling';
import { errorFormatter } from '../global/global.errors';
import errorLogger from '../../logger/middlewares/errorLogger';

const router = Router();

router
  .route('/')
  .post(
    performanceLogger,
    loginValidator,
    async (req: ValidatedRequest<LoginRequestSchema>, res, next) => {
      try {
        const user: User = await validateUser(req.body);
        if (user) {
          const token = getToken(user.id);
          logger.info(user);

          return res.json({
            token,
          });
        }
        throw new Error(ERRORS.USER_NOT_FOUND);
      } catch (err) {
        next(err);
      }
    }
  );

router.use(errorFormatter, errorLogger, errorHandler);

export { router as authRouter };
