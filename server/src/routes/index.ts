import Router from 'express';

const indexRouter = Router();
/* GET home page. */
indexRouter.get('/', function (req, res) {
  res.render('index');
});

export { indexRouter };
export * from './userRouter';
export * from './characterRouter';
