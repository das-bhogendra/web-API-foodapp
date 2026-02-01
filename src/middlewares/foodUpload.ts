import multer from 'multer';
import path from 'path';
import fs from 'fs';



const __dirname = path.dirname(__filename);

// Upload folders
const photoPath = path.join(__dirname, '../public/food_photos');
const videoPath = path.join(__dirname, '../public/food_videos');

// Create folders if not exist
if (!fs.existsSync(photoPath)) {
  fs.mkdirSync(photoPath, { recursive: true });
}
if (!fs.existsSync(videoPath)) {
  fs.mkdirSync(videoPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, photoPath);
    } else if (file.mimetype.startsWith('video')) {
      cb(null, videoPath);
    } else {
      cb(new Error('Invalid file type'), '');
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `food-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const foodUpload = multer({ storage });
