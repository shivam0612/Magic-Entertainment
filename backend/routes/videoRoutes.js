import express from 'express';
import { getVideos, tumbnailsOfVideo,getVideosToAdmin, uploadFiles, UploadVideo } from '../controllers/videoController.js'
const router = express.Router();

//=================================
//             Video
//=================================

router.post('/uploadfiles', uploadFiles);

router.post('/thumbnail', tumbnailsOfVideo);

router.post('/uploadVideo', UploadVideo);

router.get('/getVideo', getVideos);
router.get('/getvideostoadmin', getVideosToAdmin)


export default router