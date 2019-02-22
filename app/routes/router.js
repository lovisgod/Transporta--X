import express from 'express';
import * as controller from '../controllers/controller';

const router = express.Router();

router.post('/user', controller.login);

export default router;