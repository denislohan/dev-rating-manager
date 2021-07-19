/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import groupController from '../controllers/groupController';
import listValidator from '../validation/enginnerListValidator';
import verify from '../middlewares/auth';

const router = express.Router();
router.post('/', verify, listValidator.list, groupController.createOrRemove);
export default router;
