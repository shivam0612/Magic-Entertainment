import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp3') {
      return cb(res.status(400).end('Only MP3 is supported'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

const getAudioDurationInSeconds = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const fileDuration = metadata.format.duration;
        resolve(fileDuration);
      }
    });
  });
};

const uploadAudioFiles = asyncHandler(async (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
        fileDuration: getAudioDurationInSeconds(res.req.file.path), // Function to get audio duration
      });
    });
  });


export { uploadAudioFiles };
