import express from 'express';
import { Logger } from '../logger';

const router = express.Router();
// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => {
  Logger.enter('GET [ /home/test ]');
  return res.status(200).json({ msg: 'User works!' });
});

export default router;
