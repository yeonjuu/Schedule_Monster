// var express = require('express');
import { Router } from 'express';
import { userController } from '../controller';
import { asyncHandler } from '../utils';

const router = Router();

//  routing => /users
// 유저정보 확인
router.get('/', asyncHandler(userController.getUser));

module.exports = router;
