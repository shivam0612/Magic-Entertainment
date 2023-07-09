import express from 'express';
import {getSusVideos, getVideos, tumbnailsOfVideo,uploadFiles,UploadVideo} from '../controllers/videoController.js'
const router = express.Router();

//=================================
//             Video
//=================================

router.post('/uploadfiles', uploadFiles);

router.post('/thumbnail', tumbnailsOfVideo);

router.post('/uploadVideo', UploadVideo);

router.get('/getVideos', (req, res) => {
 
});

router.post('/getVideo',getVideos);

router.post('/getSubscriptionVideos', getSusVideos);

export default router