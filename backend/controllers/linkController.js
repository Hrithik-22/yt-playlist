const { google } = require("googleapis");
const youtube = google.youtube("v3");
const API_KEYS = process.env.API_KEY;

const calculateDuration = async (req, res) => {
  try {
    let nextPageToken = null;
    let videoIds=[];
    let hourRegex = /(\d+)H/g;
    let minuteRegex = /(\d+)M/g;
    let secondRegex = /(\d+)S/g;
    let length = 0;
    let title = "";
    let videoTitle = [];
    let publishedAt = [];
    let channelTitle = "";
    let description = "";
    let thumbs = [];
    let vidDurations = [];
    let totalSeconds = 0;
    let viewsCount = [];
    let likeCount = [];
    let commentCount = [];
    let speed = parseFloat(req.body.speed) || 1;

    const testResponse = await youtube.playlists.list({
      key: API_KEYS,
      part: "snippet",
      id: req.body.id,
    });

    title = testResponse.data.items[0].snippet.title;
    channelTitle = testResponse.data.items[0].snippet.channelTitle;
    description = testResponse.data.items[0].snippet.description;

    while (true) {
      const plResponse = await youtube.playlistItems.list({
        key: API_KEYS,
        part: "contentDetails,snippet",
        playlistId: req.body.id,
        maxResults: 50,
        pageToken: nextPageToken,
      });

       videoIds = plResponse.data.items.map((item) => item.contentDetails.videoId);
      //  id==current value
       videoIds.forEach((id,index) => {
            publishedAt.push(plResponse.data.items[index].contentDetails.videoPublishedAt);
          });
        // plResponse.data.items.forEach((item) => {
        //       publishedAt.push(item.contentDetails.videoPublishedAt);
        //       videoIds.push(item.contentDetails.videoId);
        //     });
          
          length += videoIds.length;
      const vidResponse = await youtube.videos.list({
        key: API_KEYS,
        part: "contentDetails,statistics,snippet",
        id: videoIds.join(","),
      });

      vidResponse.data.items.forEach((item) => {
        const views = item.statistics.viewCount;
        const likes = item.statistics.likeCount;
        const comment = item.statistics.commentCount;
        viewsCount.push(views);
        likeCount.push(likes);
        commentCount.push(comment);
        thumbs.push(item.snippet.thumbnails.medium);
        videoTitle.push(item.snippet.title);
        const hour = item.contentDetails.duration?.match(hourRegex)?.[0]?.replace("H", "") || 0;
        const min = item.contentDetails.duration?.match(minuteRegex)?.[0]?.replace("M", "") || 0;
        const secs = item.contentDetails.duration?.match(secondRegex)?.[0]?.replace("S", "") || 0;
        vidDurations.push({ hour: hour, min: min, secs: secs });
        const durationSeconds = parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(secs);
        totalSeconds += durationSeconds;
      });

      nextPageToken = plResponse.data.nextPageToken;
      if (!nextPageToken) break;
    }

    const totalDuration = totalSeconds / speed;
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = Math.floor(totalDuration % 60);

    const calculateSpeedDurations = (speed) => {
      const duration = totalSeconds / speed;
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      return { hours, minutes, seconds };
    };

    const speedDurations = {
      "speed_1x": calculateSpeedDurations(1),
      "speed_1.25x": calculateSpeedDurations(1.25),
      "speed_1.5x": calculateSpeedDurations(1.5),
      "speed_1.75x": calculateSpeedDurations(1.75),
      "speed_2x": calculateSpeedDurations(2),
    };

    const averageDurationSeconds = totalSeconds / length;
    const averageHour = Math.floor(averageDurationSeconds / 3600);
    const averageMinutes = Math.floor((averageDurationSeconds % 3600) / 60);
    const averageSeconds = Math.floor(averageDurationSeconds % 60);

    res.status(200).json({
      status: "success",
      data: {
        numberOfVideos: length,
        title: title,
        description: description,
        channelTitle: channelTitle,
        duration: totalDuration,
        videoTitle: videoTitle,
        vidDurations: vidDurations,
        videoIds: videoIds,
        likeCount: likeCount,
        viewsCount: viewsCount,
        commentCount: commentCount,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        avgHour: averageHour,
        avgMin: averageMinutes,
        avgSec: averageSeconds,
        ...speedDurations,
        thumbs: thumbs,
        publishedAt: publishedAt,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

module.exports = {
  calculateDuration,
};
