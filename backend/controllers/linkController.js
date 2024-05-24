const { google } = require("googleapis");
const youtube = google.youtube("v3");
const API_KEYS = process.env.API_KEY;

const calculateDuration = async (req, res) => {
  try {
    const playlistId = req.body.id;
    const speed = parseFloat(req.body.speed) || 1;

    const getTotalDuration = (hour, min, secs) =>
      parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(secs);

    const parseDuration = (duration) => {
      const hour = (duration.match(/(\d+)H/) || [0, 0])[1];
      const min = (duration.match(/(\d+)M/) || [0, 0])[1];
      const secs = (duration.match(/(\d+)S/) || [0, 0])[1];
      return { hour, min, secs };
    };

    const calculateSpeedDurations = (totalSeconds, speed) => {
      const duration = totalSeconds / speed;
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      return { hours, minutes, seconds };
    };

    const playlistResponse = await youtube.playlists.list({
      key: API_KEYS,
      part: "snippet",
      id: playlistId,
    });

    const playlist = playlistResponse.data.items[0];
    const title = playlist.snippet.title;
    const channelTitle = playlist.snippet.channelTitle;
    const description = playlist.snippet.description;

    let nextPageToken = null;
    let videoIds = [];
    let publishedAt = [];
    let thumbs = [];
    let videoTitle = [];
    let viewsCount = [];
    let likeCount = [];
    let commentCount = [];
    let vidDurations = [];
    let totalSeconds = 0;
    let length = 0;

    do {
      const plResponse = await youtube.playlistItems.list({
        key: API_KEYS,
        part: "contentDetails,snippet",
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken,
      });

      // console.log(plResponse.data.items);
      videoIds.push(
        ...plResponse.data.items.map((item) => item.contentDetails.videoId)
      );
      //  id==current value
      // videoIds.forEach((id, index) => {});
      publishedAt.push(
        ...plResponse.data.items.map(
          (item) => item.contentDetails.videoPublishedAt
        )
      );

      nextPageToken = plResponse.data.nextPageToken;
    } while (nextPageToken);

    length = videoIds.length;
    const MAX_RESULTS = 50; // Maximum number of results per API call
    let allVideoDetails = []; // Array to store details of all videos
    nextPageToken = null;
    const videoIdsChunks = [];
    for (let i = 0; i < videoIds.length; i += MAX_RESULTS) {
      videoIdsChunks.push(videoIds.slice(i, i + MAX_RESULTS));
    }
    // Fetch video details for each chunk
    for (const chunk of videoIdsChunks) {
      // console.log(chunk);
      let nextPageToken = null;
      do {
        const vidResponse = await youtube.videos.list({
          key: API_KEYS,
          part: "contentDetails,statistics,snippet",
          id: chunk.join(","),
          maxResults: MAX_RESULTS,
          pageToken: nextPageToken,
        });

        // Concatenate the fetched video details to the allVideoDetails array
        allVideoDetails = allVideoDetails.concat(vidResponse.data.items);

        nextPageToken = vidResponse.data.nextPageToken;
      } while (nextPageToken);
    }

    // At this point, allVideoDetails will contain details of all videos
    // console.log(allVideoDetails);
    allVideoDetails.forEach((item) => {
      const { hour, min, secs } = parseDuration(item.contentDetails.duration);
      const durationSeconds = getTotalDuration(hour, min, secs);
      totalSeconds += durationSeconds;
      videoTitle.push(item.snippet.title);
      thumbs.push(item.snippet.thumbnails.medium);
      viewsCount.push(item.statistics.viewCount);
      likeCount.push(item.statistics.likeCount);
      commentCount.push(item.statistics.commentCount);
      vidDurations.push({ hour, min, secs });
    });

    const totalDuration = totalSeconds / speed;
    const averageDurationSeconds = totalSeconds / length;

    const speedDurations = {
      speed_1x: calculateSpeedDurations(totalSeconds, 1),
      speed_1x25x: calculateSpeedDurations(totalSeconds, 1.25),
      speed_1x5x: calculateSpeedDurations(totalSeconds, 1.5),
      speed_1x75x: calculateSpeedDurations(totalSeconds, 1.75),
      speed_2x: calculateSpeedDurations(totalSeconds, 2),
    };

    const averageHour = Math.floor(averageDurationSeconds / 3600);
    const averageMinutes = Math.floor((averageDurationSeconds % 3600) / 60);
    const averageSeconds = Math.floor(averageDurationSeconds % 60);

    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = Math.floor(totalDuration % 60);
    // console.log(videoIds);

    res.status(200).json({
      status: "success",
      data: {
        numberOfVideos: length,
        title,
        description,
        channelTitle,
        duration: totalDuration,
        videoTitle,
        vidDurations,
        videoIds,
        likeCount,
        viewsCount,
        commentCount,
        hours,
        minutes,
        seconds,
        avgHour: averageHour,
        avgMin: averageMinutes,
        avgSec: averageSeconds,
        ...speedDurations,
        thumbs,
        publishedAt,
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
