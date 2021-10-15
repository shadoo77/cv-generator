import express from 'express';

const router = express.Router();
// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get("/test", (req, res) => {
  return res.status(200).json({ msg: "User works!" });
});

export default router;
