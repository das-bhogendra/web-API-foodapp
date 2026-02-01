import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async';

// ================= PHOTO UPLOAD =================
// @desc    Upload Food Photo
// @route   POST /api/v1/foods/upload-photo
// @access  Public
export const uploadFoodPhoto = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: 'Please upload a photo' });
      return;
    }

    const maxSize = parseInt(process.env.MAX_FILE_UPLOAD || '5000000', 10);

    if (req.file.size > maxSize) {
      res.status(400).json({
        message: `Image must be less than ${maxSize} bytes`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: req.file.filename,
      message: 'Food photo uploaded successfully',
    });
  }
);

// ================= VIDEO UPLOAD =================
// @desc    Upload Food Video
// @route   POST /api/v1/foods/upload-video
// @access  Public
export const uploadFoodVideo = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: 'Please upload a video' });
      return;
    }

    const maxSize = parseInt(process.env.MAX_FILE_UPLOAD || '50000000', 10);

    if (req.file.size > maxSize) {
      res.status(400).json({
        message: `Video must be less than ${maxSize} bytes`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: req.file.filename,
      message: 'Food video uploaded successfully',
    });
  }
);
