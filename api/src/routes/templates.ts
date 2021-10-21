import express from 'express';
import { Templates } from '../models/Templates';
import { Logger } from '../logger';

const router = express.Router();

// @route  GET api/templates
// @desc   Get all templates
// @access Public
router.get('/', async (req, res) => {
  try {
    Logger.enter('Get /templates');
    const templates = await Templates.find({});
    if (!templates || !templates.length) {
      return res.status(400).json({ error: 'No templates found!' });
    }
    return res.status(200).json(templates);
  } catch (error) {
    return res.status(404).json(error);
  }
});

export default router;
