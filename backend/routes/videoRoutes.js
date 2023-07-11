import express from 'express';
import { getVideos, tumbnailsOfVideo, uploadFiles, UploadVideo } from '../controllers/videoController.js'
const router = express.Router();

//=================================
//             Video
//=================================

router.post('/uploadfiles', uploadFiles);

router.post('/thumbnail', tumbnailsOfVideo);

router.post('/uploadVideo', UploadVideo);

router.get('/getVideo', getVideos);


export default router