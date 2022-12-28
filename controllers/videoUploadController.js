const {saveVideoDetails, fetchVideoList} = require('../services/videoService');
const fs = require('fs');
const { exec } = require('node:child_process');

// handle uploading video file and creating mpd file with different qualities
const uploadVideo = async(req, res) => {
	const {title, description} = req.body;
	const videoFile = req.file;
	// validating parameters
	if (!title || !description || !videoFile) {
		return res.status(400).json({error: 'Inputs missing'});
	}

	// save the video details into the database
	const video = await saveVideoDetails(title, description);
	if (!video) {
		return res.status(500).json({error: 'Could not save the video'});
	}

	// saving video to the file storage
	const videoID = video._id.toString();
	let filename =  videoFile.filename.split('.')[0];
	const folderName = `segments/${videoID}`;
	try {
		if(!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}
	}catch (e) {
		console.log(e);
	}

	filename = filename.split('.')[0];
	let aspectsetting = `ffmpeg -y -i ./uploads/${filename}.mp4 -aspect 16:9 -c copy ./uploads/processed/${filename}.mp4`;
	let thumbnailcmd = `ffmpeg -i ./uploads/${filename}.mp4 -vframes 1 ./segments/thumbnails/${videoID}.jpg`;
	let cmd = `ffmpeg -re -i ./uploads/processed/${filename}.mp4 -map 0 -map 0 -map 0 -c:a aac -c:v libx264 -b:v:1 800k -b:v:2 500k -s:v:0 1920x1080 -s:v:1 1280x720 -s:v:2 720x480 -profile:v:1 baseline -profile:v:2 baseline -profile:v:0 main -bf 1 -keyint_min 120 -g 120 -sc_threshold 0 -b_strategy 0 -ar:a:1 22050 -use_timeline 1 -use_template 1 -adaptation_sets "id=0,streams=v id=1,streams=a" -f dash ./segments/${videoID}/${videoID}_out.mpd`;

	exec(aspectsetting, (err, output) => {
		if (err) {
			console.error('could not execute command: ', err);
			return;
		}
		exec(cmd, (err, output) => {
			if (err) {
				console.error('could not execute command: ', err);
				return;
			}
			console.log('Mpd file has been generated');
			exec(thumbnailcmd, (err, output) => {
				if (err) {
					console.error('could not execute command: ', err);
					return;
				}
				console.log('Thumbnail has been created');
				fs.unlinkSync(`uploads/${filename}.mp4`);
				res.status(200).send('Video has processed');
			});
		});
	});
};


// get video list
const getVideoList = async (req, res) => {

	const videoList = await fetchVideoList();
	if(videoList) {
		res.status(200).json({data:videoList});
	} else {
		res.status(500).json({error: 'fetching error'});
	}
};



module.exports = {
	uploadVideo,
	getVideoList
};
