import Router from 'express';

const router = Router();
/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: '12Team project1' });
});

module.exports = router;
