import express from 'express';
import * as controller from '../controllers/controller';

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/bookride', controller.bookride);


export default router;