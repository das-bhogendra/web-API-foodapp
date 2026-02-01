import express from 'express';
import {
  uploadFoodPhoto,
  uploadFoodVideo,
} from '../controllers/food.controller.js';
import { foodUpload } from '../middlewares/foodUpload';

const router = express.Router();

router.post(
  '/upload-photo',
  foodUpload.single('photo'),
  uploadFoodPhoto
);

router.post(
  '/upload-video',
  foodUpload.single('video'),
  uploadFoodVideo
);

export default router;
