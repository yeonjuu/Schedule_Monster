import Router from 'express';

const indexRouter = Router();
/* GET home page. */
indexRouter.get('/', function (req, res) {
  res.render('index');
});

export { indexRouter };
export * from './userRouter';
export * from './characterRouter';
export * from './characterListRouter';
export * from './itemRouter';
export * from './categoryRouter';
export * from './scheduleRouter';
export * from './userItemRouter';
